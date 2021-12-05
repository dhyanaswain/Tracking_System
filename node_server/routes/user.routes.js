const express = require('express')
const router = express.Router()
const usersModel = require('../models/user.model')
const middlewares = require('../helpers/middlewares')

/* All users */
router.get('/', async (req, res) => {
    await usersModel.getUsers()
    .then(users => res.json(users))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Check a user with name ans password */
router.post('/login', middlewares.checkUserDetails, async (req, res) => {
    const { email, password } = req.body  
    await usersModel.getUserLogin(email, password)
    .then(user => res.json(user))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})
/* A user by id */
router.get('/:id', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await usersModel.getUser(id)
    .then(user => res.json(user))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


/* Insert a new user */
router.post('/', middlewares.checkFieldsUser, async (req, res) => {
    await usersModel.insertUser(req.body)
    .then(post => res.status(201).json({
        message: `The user #${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a user */
router.put('/:id', middlewares.mustBeInteger, middlewares.checkFieldsUser, async (req, res) => {
    const id = req.params.id

    await usersModel.updateUser(id, req.body)
    .then(user => res.json({
        message: `The user #${id} has been updated`,
        content: user
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a user */
router.delete('/:id', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await usersModel.deleteUser(id)
    .then(user => res.json({
        message: `The post #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router