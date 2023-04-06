const knex = require('../libraries/Postgres')
const productQuery = require('../models/Product')

const getCartDetailsFromDb = (userId) => {    
    return knex("cart_details")
            .select("*")
            .where("userId", userId);
}

const addItemToCartInDb = async(userId, productId) => {
    let product = await productQuery.getProductFromDb(productId)
    return knex("cart_details")
            .insert({
                userId,
                productId,
                amount: product[0].sellingPrice,
                quantity: 1
            })
}

const deleteItemFromCartDb = (userId, productId) => {
    return knex("cart_details")
            .where({
                "userId": userId,
                "productId": productId
            })
            .del()
}

const changeQtyOfIteminDb = async(userId, productId, quantity) => {
    let product = await productQuery.getProductFromDb(productId)
    return knex("cart_details")
            .where({
                "userId": userId,
                "productId": productId
            })
            .update({
                "quantity": quantity,
                "amount": product[0].sellingPrice * quantity
            })
}

const clearCartDb = async(userId) => {
    return knex("cart_details")
            .del()
}

module.exports = {
    getCartDetailsFromDb, addItemToCartInDb, deleteItemFromCartDb, changeQtyOfIteminDb, clearCartDb
}