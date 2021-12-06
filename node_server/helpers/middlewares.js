function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function mustBeString(req, res, next) {
    const userName = req.params.userName

    if (!(typeof userName) =='string') {
        res.status(400).json({ message: 'userName must be an string' })
    } else {
        next()
    }
}

function checkUserDetails(req, res, next) {
    const { email, password } = req.body
    if (email && password) {
        next()
    } else {
        res.status(400).json({ message: 'Not a user' })
    }
}

function checkFieldsUser(req, res, next) {
    const { name, password, email, content, userType } = req.body
    if (name && password && email && content && userType) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function checkFieldsOrder(req, res, next) {
    const { from, to, status, content, pickedUpBy, placedBy } = req.body
    if (from && to && status && content && (pickedUpBy || placedBy)) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function checkFieldsUpdateOrder(req, res, next) {
    const { status, placedBy } = req.body
    if (status && placedBy) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    mustBeString,
    checkUserDetails,
    checkFieldsUser,
    checkFieldsOrder,
    checkFieldsUpdateOrder
}