const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Post } = require('../models')
const upload = require('../lib/upload')

router
    .route('/')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Post']
        // #swagger.description = 'This endpoint gets all posts by me.'
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
    .then(() => Post.find({profile: req.user.profile._id}).populate('comments').populate('profile')) 
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )

    .post(upload.concat([(req, res, next) => Promise.resolve()
        // #swagger.ignore = true
    .then(() => new Post({...req.body, profile: req.user.profile._id}).save())
    .then(post => post.populate({ path: 'profile', populate: { path: 'user' }})) 
    .then(args => req.publish('post', req.user.profile.followers, args) )
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
    ]))

    //.populate({ path: 'profile', populate: { path: 'user' }}))
    

router
    .route('/:id')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Post']
        // #swagger.description = 'This endpoint gets a post by id.'
        // #swagger.parameters['id'] = { description: "Post Id." }
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Posts successfully obtained.',
            }
            #swagger.responses[404] = {
                description: 'Posts not found.',
            }
        */
    .then(() => Post.findById(req.params.id).populate('comments').populate('profile'))
    .then(data => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Post']
        // #swagger.description = 'This endpoint updates a post by id.'
        // #swagger.parameters['id'] = { description: "Post Id." }
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Post" }
            }   
        */

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Posts successfully obtained.',
            }
            #swagger.responses[404] = {
                description: 'Posts not found.',
            }
        */
    .then(() => Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Post']
        // #swagger.description = 'This endpoint deletes a post by id.'
        // #swagger.parameters['id'] = { description: "Post Id." }

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Posts successfully deleted.',
            }
        */

    .then(() => Post.deleteOne({ _id: req.params.id }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )

router
    .route('/:id/like')
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Post']
        // #swagger.description = 'This endpoint likes a post.'
        // #swagger.parameters['id'] = { description: "Post Id." }

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Post successfully liked.',
            }
            #swagger.responses[404] = {
                description: 'Post not found.',
            }
        */
    .then(() => Post.findByIdAndUpdate((req.params.id), { $addToSet: { likes: req.user.profile._id } }, { new: true, runValidators: true }))
    .then(args => req.publish('post-like', [args.profile._id], args))
    .then(data => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))
    )

function createPostEndpoint() {
    // #swagger.start

    /*
        #swagger.path = '/v1/posts'
        #swagger.method = 'post'
        #swagger.description = 'This endpoint posts a post.'
        #swagger.tags = ['Post']
        #swagger.produces = ['application/json']
    */
    
    /*   
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/Post" }
        }   
    */
    /* 
        #swagger.security = [{
            "JWT": []
        }]
    */
    /* 
        #swagger.responses[201] = {
            description: 'Posts successfully created.',
        }
    */
    // #swagger.end
}
createPostEndpoint()

module.exports = router