const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Profile } = require('../models')
const JWT_SECRET = process.env.JWT_SECRET || 'accesstoken'

router
    .route('/login')
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Security']
        // #swagger.description = 'This endpoint signs the user in.'
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Login" }
            }   
        */
        /* 
            #swagger.responses[200] = {
                description: 'User successfully connected.',
            }

            #swagger.responses[404] = {
                description: 'User not found.',
            }

            #swagger.responses[401] = {
                description: 'Invalid password or user.',
            }
        */
    .then(() => User.findOne({ user: req.body.user }))
    .then(user => user ? bcrypt.compare(req.body.password, user.password) : next(createError(404)))
    .then(passHashed => passHashed ? User.findOne({ user: req.body.user }, '-password') : next(createError(401)))
    .then(user => jwt.sign(JSON.stringify(user), JWT_SECRET))
    .then(accessToken => res.status(200).json({ accessToken }))
    .catch(err => next(err))
    )

    
router
    .route('/register')
    .post((req, res, next) => Promise.resolve()
        // #swagger.tags = ['Security']
        // #swagger.description = 'This endpoint creates a user.'
        
        /* 
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Registry" }
            }   
        */
        /* 
            #swagger.responses[201] = {
                description: 'User successfully created.',
            }
        */

    .then(() => bcrypt.hash(req.body.password, 10))
    .then(passHashed => new User({ ...req.body, password: passHashed}).save())
    .then(user => new Profile({ name: req.body.name || req.body.user, user: user._id}).save())
    .then(profile => User.findByIdAndUpdate(profile.user, { profile: profile }, { new: true, runValidators: true }).populate('profile'))
    .then(user => User.findOne({_id: user._id}, '-password').populate('profile'))
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
    )

module.exports = router