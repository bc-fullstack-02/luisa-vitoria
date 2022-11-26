const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true,
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
})

module.exports = model('User', userSchema)