const knex = require('../libraries/Postgres')
const crypto = require('crypto')

const getAllProductsFromDb = () =>{
    return knex("products")
            .select("*")
}

const getProductFromDb = (id) => {
    return knex("products")
            .select("*")
            .where("id", id)
}

const insertProductInDb = (itemName, brand, costPrice, sellingPrice, details, imgUrls, availableUnits) => {
    return knex("products")
            .insert({
                id: crypto.randomUUID(),
                name: itemName,
                brand: brand,
                costPrice: costPrice,
                sellingPrice: sellingPrice,
                details: details,
                imageUrl: imgUrls,
                availableUnits: availableUnits
            })
} 

module.exports = {
    getAllProductsFromDb, getProductFromDb, insertProductInDb
}