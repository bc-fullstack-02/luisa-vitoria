const mongoose = require('mongoose')
const {
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

//`${process.env.MONGO_DB || 'mongodb://localhost:27017/rest-api'}`

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log(`Successfully connected to database ${url}`);

exports.Post = require('./post.js')
exports.Comment = require('./comment.js')
exports.User = require('./user')
exports.Profile = require('./profile')

mongoose.connection.on('error', () => {
  console.error('Mongo not connected')
})
mongoose.connection.on('connected', () => {
  console.info('Mongo connected')
})
mongoose.connection.on('disconnected', () => {
  console.error('Mongo disconnected')
})

exports.Connection = connect