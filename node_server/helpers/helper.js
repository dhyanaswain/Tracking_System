const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        if (array[array.length - 1].id) {
            return array[array.length - 1].id + 1
        } else if (array[array.length - 1].orderId) {
            return array[array.length - 1].orderId + 1
        }
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, userDetail) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == userDetail)
        if (!row) {
            reject({
                message: 'ID is not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function mustBeInArrayOfOrder(array, userDetail) {
    return new Promise((resolve, reject) => {
        const row = array.filter(r => r.placedBy == userDetail).map( obj => obj)
        if (!row) {
            reject({
                message: 'Order Details is not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function mustBeInArrayOfOrderById(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.orderId == id)
        if (!row) {
            reject({
                message: 'Order Details is not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function mustBeAnUser(users, email, password) {
    return new Promise((resolve, reject) => {
        const row = users.find(r => r.email == email && r.password == password)
        if (!row) {
            reject({
                message: 'Username and password do not match',
                status: 404
            })
        }
        resolve({ id: row.id, name: row.name, userType: row.userType })
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    mustBeInArrayOfOrder,
    writeJSONFile,
    mustBeAnUser,
    mustBeInArrayOfOrderById
}