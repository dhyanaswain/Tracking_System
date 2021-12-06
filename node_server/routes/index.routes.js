const express = require('express')
const router = express.Router()

router.use('/api/v1/users', require('./user.routes'))
router.use('/api/v1/orders', require('./order.routes'))

module.exports = router