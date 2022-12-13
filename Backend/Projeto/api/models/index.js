const mongoose = require('mongoose')

const connect = mongoose.connect(`${process.env.MONGO_URL || 'mongodb://localhost:27017/sysmap-api'}`, {
      useNewUrlParser: true,
      dbName: 'sysmap-api', 
    })
console.log(`Successfully connected to database ${process.env.MONGO_URL || 'mongodb://localhost:27017/sysmap-api'}`);

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