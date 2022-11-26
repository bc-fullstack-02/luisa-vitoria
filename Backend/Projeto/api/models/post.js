const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2
  },
  description: {
    type: String,
    required: true,
    minLength: 2
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }]
}, { timestamps: true })

module.exports = model('Post', postSchema)