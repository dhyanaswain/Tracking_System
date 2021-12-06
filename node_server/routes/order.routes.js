const express = require('express')
const router = express.Router()
const ordersModel = require('../models/order.model')
const middlewares = require('../helpers/middlewares')

/* All users */
router.get('/', async (req, res) => {
    await ordersModel.getOrders()
    .then(orders => res.json(orders))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

// /* A order by userName */
router.get('/:userName', middlewares.mustBeString, async (req, res) => {
    const userName = req.params.userName
    await ordersModel.getUsersOrder(userName)
    .then(user => res.json(user))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new order */
router.post('/', middlewares.checkFieldsOrder, async (req, res) => {
    await ordersModel.insertOrder(req.body)
    .then(order => res.status(201).json({
        message: `The order #${order.orderId} has been created`,
        content: order
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a order */
router.put('/:id', middlewares.checkFieldsUpdateOrder, async (req, res) => {
    const id = req.params.id
    await ordersModel.updateOrder(id, req.body)
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

module.exports = router