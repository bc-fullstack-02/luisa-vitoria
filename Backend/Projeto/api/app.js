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


const { Post, Comment, User, Security, Profile, Feed} = require('./routers')
const { User: UserModel, Connection} = require('./models')

//instantiate express
const app = express()

app.use(cors())
app.use(helmet())

//instantiate swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))

//middlewares configuration
app.use(express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(logger(process.env.NODE_ENV || 'dev'))

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return next(createError(401))
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403))
        UserModel.findOne({ user })
            .then(u => {
                req.user = u
                next()
            })
            .catch(error => next(error))
    })
}

//Database Connection
app.use((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
)

// add all routes on a prefix version
app.use('/v1/posts', authenticateToken, Comment)
app.use('/v1/posts', authenticateToken, Post)
app.use('/v1/user', authenticateToken, User)
app.use('/v1/profiles', authenticateToken, Profile)
app.use('/v1/feed', authenticateToken, Feed)
app.use('/v1/security', Security)


// catch all 404 since no middleware responded
app.use(function (req, res, next) {
  const err = createError(404)
  next(err)
})

// treat error or validation and store the errors
app.use(function (error, req, res, next) {
  // mongoose validator?
  if (error.name && error.name === 'ValidationError') {
    res.status(406).json(error)
  } else if ((error.status && error.status === 404) || (error.name && error.name === 'CastError')) {
    res.status(404).json({
      url: req.originalUrl,
      error: {
        message: 'Not Found'
      }
    })
  } else if(error.code == 11000) {
    res.status(500).json({
        url: req.originalUrl,
        error: 'Duplicate key not allowed'
    }) 

  }else {
    // error page
    res.status(error.status || 500).json({
        url: req.originalUrl,
        error
    })
  }
})

module.exports = app
