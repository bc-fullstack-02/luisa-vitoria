const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Post, Profile, Connection } = require('../models')


router
    .route('/')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Feed']
        // #swagger.description = 'This endpoint lists all posts.'
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Posts successfully obtained.',
            }
        */
    .then(() => Profile.findById(req.user.profile._id))
    .then(profile => Post.find({ $or: [ { profile: { $in: profile.following } }, { profile: req.user.profile._id } ] }).populate({ path: 'profile', populate: { path: 'user' }}))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )

module.exports = router