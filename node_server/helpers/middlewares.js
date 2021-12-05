function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
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

module.exports = {
    mustBeInteger,
    checkUserDetails,
    checkFieldsUser
}