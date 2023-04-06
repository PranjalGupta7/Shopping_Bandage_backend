const knex = require("../libraries/Postgres")
const crypto = require("crypto")

const getOrderDetailsFromDb = (userId) => {
    return knex("order_details")
            .select("*")
            .where('userId', userId)
}

const insertOrderDetailsInDb = async(userId, product, transactionNumber, timeStamp) => {
    return await knex("order_details")
            .insert({
                "id": crypto.randomUUID(), 
                "userId": userId,
                "orderStatus": "Pending",
                "paymentStatus": "Pending",
                "productId": product.productId,
                "transactionNumber": transactionNumber,
                "timeStamp": timeStamp,
                "quantity": product.quantity
            })
}


module.exports = {
    getOrderDetailsFromDb, insertOrderDetailsInDb
}