let users = require('../data/users.json')
const filename = './data/users.json'
const helper = require('../helpers/helper.js')

function getUsers() {
    return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(users)
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(user => resolve({ id: user.id, name: user.name, userType: user.userType, content: user.content }))
        .catch(err => reject(err))
    })
}

function getUserLogin(name, password) {
    return new Promise((resolve, reject) => {
        helper.mustBeAnUser(users, name, password)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}

function insertUser(newUser) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(users) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        const row = users.find(r => r.name == newUser.name || r.email == newUser.email)
        if (row) {
            reject({
                message: `User name: ${newUser.name} is already exist, please enter new user name`,
                status: 500
            })
        } else {
            newUser = { ...id, ...date, ...newUser }
            users.push(newUser)
            helper.writeJSONFile(filename, users)
            resolve(newUser)
        }
    })
}

function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(user => {
            const index = users.findIndex(p => p.id == user.id)
            id = { id: user.id }
            const date = {
                createdAt: user.createdAt,
                updatedAt: helper.newDate()
            } 
            users[index] = { ...id, ...date, ...newUser }
            helper.writeJSONFile(filename, users)
            resolve(users[index])
        })
        .catch(err => reject(err))
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(() => {
            users = users.filter(p => p.id !== parseInt(id))

            console.log('user', users)
            helper.writeJSONFile(filename, users)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getUsers,
    getUser,
    getUserLogin,
    insertUser,
    updateUser,
    deleteUser
}