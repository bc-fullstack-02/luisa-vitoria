const path = require('path')
require("dotenv").config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const createError = require('http-errors')
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("./swagger_output.json")
const jwt = require('jsonwebtoken')
const pubsub = require('./lib/pubsub')
const bodyParser = require('body-parser')
const JWT_SECRET = process.env.JWT_SECRET || 'accesstoken'

//import routers
const { Post, Comment, User, Security, Profile, Feed } = require('./routers')

//import models
const { User: UserModel, Connection} = require('./models')

//instantiate express
const app = express()

app.use(cors())
app.use(helmet()) //uncomment in frontend

//instantiate swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))

//middlewares configuration
const urlencodedMiddleware =  bodyParser.urlencoded({ extended: true })

app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req, res, next))

app.use(bodyParser.json({
  defer: true
}))

app.use(logger(process.env.NODE_ENV || 'dev'))

//Database Connection
app.use((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
)

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return next(createError(401))
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return next(createError(403))
        UserModel.findOne({ _id: user._id }).populate('profile')
            .then(u => {
                req.user = u
                next()
            })
            .catch(error => next(error))
    })
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(pubsub.pub)

// add all routes on a prefix version
app.use('/v1/posts', authenticateToken, Comment)
app.use('/v1/posts', authenticateToken, Post)
app.use('/v1/user', authenticateToken, User)
app.use('/v1/profiles', authenticateToken, Profile)
app.use('/v1/feed', authenticateToken, Feed)
app.use('/v1/security', Security)

app.get('/v1/seed', (req, res) => {
  require('./seed')
})


// catch all 404 since no middleware responded
app.use(function (req, res, next) {
  const err = createError(404)
  next(err)
})

// treat error or validation and store the errors
app.use(function (error, req, res, next) {
  if (error.name && error.name === 'ValidationError') {
    res.status(406).json(error)
  } else if ((error.status && error.status === 404) || (error.name && error.name === 'CastError')) {
    res.status(404).json({
      url: req.originalUrl,
      error: {
        message: 'Not Found'
      }
    })
  } else if (error.code == 11000) {
    res.status(500).json({
        url: req.originalUrl,
        error: 'Duplicate key not allowed'
    })
  } else {
    res.status(error.status || 500).json({
        url: req.originalUrl,
        error: 'internal error'
    })
  }
})

module.exports = app
