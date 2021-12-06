let orders = require('../data/orders.json')
const filename = './data/orders.json'
const helper = require('../helpers/helper.js')

function getOrders() {
    return new Promise((resolve, reject) => {
        if (orders.length === 0) {
            reject({
                message: 'no orders available',
                status: 202
            })
        }
        resolve(orders)
    })
}

function getUsersOrder(userName) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArrayOfOrder(orders, userName)
        .then(order => resolve(order))
        .catch(err => reject(err))
    })
}


function insertOrder(newOrder) {
    return new Promise((resolve, reject) => {
        const orderId = { orderId: helper.getNewId(orders) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        }
        const row = orders.find(r => r.from == newOrder.from && r.to == newOrder.to && r.placedBy == newOrder.placedBy && r.status == newOrder.status)
        
        if (row) {
            reject({
                message: `Order details: ${newOrder.placedBy} is already exist, please enter new order details`,
                status: 500
            })
        } else {
            newOrder = { ...orderId, ...date, ...newOrder }
            orders.push(newOrder)
            helper.writeJSONFile(filename, orders)
            resolve(newOrder)
        }
    })
}

function updateOrder(orderId, newOrder) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArrayOfOrderById(orders, orderId)
        .then(order => {
            const index = orders.findIndex(p => p.orderId == order.orderId)
            orderId = { orderId: order.orderId }
            const date = {
                createdAt: order.createdAt,
                updatedAt: helper.newDate()
            }
            orders[index] = { ...orderId, ...date, ...newOrder }
            helper.writeJSONFile(filename, orders)
            resolve(orders[index])
        })
        .catch(err => reject(err))
    })
}


module.exports = {
    getOrders,
    insertOrder,
    getUsersOrder,
    updateOrder
}