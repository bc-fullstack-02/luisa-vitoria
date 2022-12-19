const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Post, Comment } = require('../models')


router
    .param('postId', (req, res, next, id) => Promise.resolve()
        .then(() =>  Post.findById(id))
        .then(post => post ? next() : next(createError(404)))
        .catch(err => next(err))
    )
    .route('/:postId/comments')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint gets comments by a post.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Comments successfully obtained.',
            }
            #swagger.responses[404] = {
                description: 'Post not found.',
            }
        */
    .then(() => Comment.find({ post: req.params.postId }).populate('post').populate('profile'))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint posts a comment.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Comment" }
            }   
        */
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[201] = {
                description: 'Comment successfully created.',
            }
            #swagger.responses[404] = {
                description: 'Post not found.',
            }
        */
    .then(() => new Comment(Object.assign(req.body, { profile: req.user.profile._id, post: req.params.postId})).save())   
    .then(comment => updatePost(comment, comment._id, comment.post))
    .then(args => req.publish('comment', [args.post.profile], args))
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
    )

    function updatePost(comment, commentId, postId) {
        return Post.findById(postId)
        .then(post => Object.assign(post, { comments: [...post.comments, commentId] }))
        .then(post => Post.findByIdAndUpdate(comment.post, post))
        .then(() => comment)
    }

router
    .param('postId', (req, res, next, id) => Promise.resolve()
        .then(() =>  Post.findById(id))
        .then(post => post ? next() : next(createError(404)))
        .catch(err => next(err))
    )
    .route('/:postId/comments/:id')
    .get((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint gets a comment by id.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        // #swagger.parameters['id'] = { description: "Comment Id." }
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Comment successfully obtained.',
            }
            #swagger.responses[404] = {
                description: 'Post or comment not found.',
            }
        */
    .then(() => Comment.findById(req.params.id).populate('post').populate('profile'))
    .then(data => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint updates a comment by id.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        // #swagger.parameters['id'] = { description: 'Comment Id.' }
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Comment" }
            }   
        */
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Comment successfully updated.',
            }
            #swagger.responses[404] = {
                description: 'Post or comment not found.',
            }
        */
    .then(() => Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint deletes a comment by id.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        // #swagger.parameters['id'] = { description: "Comment Id." }
        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Comment successfully deleted.',
            }
            #swagger.responses[404] = {
                description: 'Post or comment not found.',
            }
        */
    .then(() => Comment.deleteOne({ _id: req.params.id }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )

router
    .param('postId', (req, res, next, id) => Promise.resolve()
        .then(() =>  Post.findById(id))
        .then(post => post ? next() : next(createError(404)))
        .catch(err => next(err))
    )
    .route('/:postId/comments/:id/like')
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Comment']
        // #swagger.description = 'This endpoint likes a comment.'
        // #swagger.parameters['postId'] = { description: "Post Id." }
        // #swagger.parameters['id'] = { description: 'Comment Id. '}

        /* 
            #swagger.security = [{
                "JWT": []
            }]
        */
        /* 
            #swagger.responses[200] = {
                description: 'Comment successfully liked.',
            }
            #swagger.responses[404] = {
                description: 'Post or comment not found.',
            }
        */
    .then(() => Comment.findByIdAndUpdate((req.params.id), { $addToSet: { likes: req.user.profile._id } }, { new: true, runValidators: true }).populate('likes'))
    .then(args => req.publish('comment-like', [args.profile], args))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
    )
module.exports = router