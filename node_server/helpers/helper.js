const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID is not found',
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
    writeJSONFile,
    mustBeAnUser
}