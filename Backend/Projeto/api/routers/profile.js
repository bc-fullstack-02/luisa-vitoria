const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Profile } = require('../models')
const upload = require('../lib/upload')

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
    .then(() => Profile.find({ $nor: [ { user: req.user._id } ]}).populate('user'))
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

    .patch(upload.concat([(req, res, next) => Promise.resolve()
    .then(() => Profile.updateOne({_id: req.params.id}, { $set: req.body }))
    .then(() => Profile.findById(req.params.id).populate(['following', 'followers']))
    .then(data => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))])
    )


router
    .route('/:id/follow')
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint follows a profile by id.'
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
    .then(() => Profile.findByIdAndUpdate((req.params.id), { $addToSet: { followers: req.user.profile._id } }, { new: true, runValidators: true }))
    .then(profile => profile ? Profile.findByIdAndUpdate((req.user.profile._id), { $addToSet: { following: req.params.id } }, { new: true, runValidators: true }) : next(createError(404)))
    .then(profile => [profile, req.params.id])
    .then(([profile, profileId]) => req.publish('follow', [profileId], profile))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )

router
    .route('/:id/unfollow')
        // #swagger.tags = ['Profile']
        // #swagger.description = 'This endpoint unfollows a profile by id.'
        // #swagger.parameters['id'] = { description: "Profile Id." }
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Profile successfully unfollowed.',
            }
            #swagger.responses[404] = {
                description: 'Profile not found.',
            }
        */
    .post((req, res, next) => Promise.resolve()
    .then(() => Profile.findByIdAndUpdate((req.params.id), { $pull: { followers: req.user.profile._id } }, { new: true, runValidators: true }))
    .then(profile => profile ? Profile.findByIdAndUpdate((req.user.profile._id), { $pull: { following: req.params.id } }, { new: true, runValidators: true }) : next(createError(404)))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
)


module.exports = router