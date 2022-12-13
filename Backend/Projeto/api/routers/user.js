const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { User } = require('../models')
const JWT_SECRET = process.env.JWT_SECRET || 'accesstoken'

router
    .route('/me')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['User']
        // #swagger.description = 'This endpoint gets my user.'
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'User successfully obtained.',
            }
        */
    .then(() => User.findById(req.user.id).populate('profile'))
    .then(data => data? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        // #swagger.tags = ['User']
        // #swagger.description = 'This endpoint updates my user.'
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/User" }
            }   
        */
        /* 
            #swagger.responses[200] = {
                description: 'User successfully updated.',
            }
        */

    .then(() => User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })) 
    .then(user => User.findOne({ _id: user._id }, '-password'))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        // #swagger.tags = ['User']
        // #swagger.description = 'This endpoint deletes my user.'

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */

       /* 
            #swagger.responses[200] = {
                description: 'User successfully deleted.',
            }
        */
    .then(() => User.deleteOne({ _id: req.user.id }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )


module.exports = router