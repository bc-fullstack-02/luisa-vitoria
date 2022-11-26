const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Profile } = require('../models')

router
    .route('/')
    .get((req, res, next) => Promise.resolve()

        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint lists all profiles.'

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        
        /* 
            #swagger.responses[200] = {
                description: 'Profiles successfully obtained.',
            }
        */
        .then(() => Profile.find({})) 
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )

router
    .route('/search')
    .get((req, res, next) => Promise.resolve()

        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint searches a profile.'
        /* #swagger.parameters['q'] = { 
            in: 'query',
            type: 'string',
            description: 'query parameter'
            }
        /*/

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Profile successfully obtained.',
            }

            #swagger.responses[404] = {
                description: 'Profile not found.',
            }
        */
        .then(() => Profile.find({ $text: { $search: `${req.query.q}` } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }))
        .then(data => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )

router
    .route('/:id')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint gets a profile by id.'
        // #swagger.parameters['id'] = { description: "Profile Id." }

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        
        /* 
            #swagger.responses[200] = {
                description: 'Profile successfully obtained.',
            }
            #swagger.responses[404] = {
                description: 'Profile not found.',
            }
        */
        .then(() => Profile.findById(req.params.id).populate(['following', 'followers']))
        .then(data => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )

router
    .route('/:id/follow')
    .post((req, res, next) => Promise.resolve()

        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint follow a profile by id.'
        // #swagger.parameters['id'] = { description: "Profile Id." }

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Profile successfully followed.',
            }
            #swagger.responses[404] = {
                description: 'Profile not found.',
            }
        */
        .then(() => Profile.findByIdAndUpdate((req.params.id), { $push: { followers: req.user.profile._id } }, { new: true, runValidators: true }))
        .then(profile => profile ? Profile.findByIdAndUpdate((req.user.profile._id), { $push: { following: req.params.id} }, { new: true, runValidators: true }) : next(createError(404)))
        // .then(() => Profile.findByIdAndUpdate((req.user.profile._id), { $push: { following: req.params.id} }, { new: true, runValidators: true }))
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )

module.exports = router