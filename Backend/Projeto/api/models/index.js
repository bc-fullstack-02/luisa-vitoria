const mongoose = require('mongoose')

const connect = mongoose.connect(`${process.env.MONGO_DB || 'mongodb://localhost:27017/rest-api'}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log(`Successfully connected to database ${process.env.MONGO_DB}`);

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