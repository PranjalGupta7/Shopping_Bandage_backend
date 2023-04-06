const productsQuery = require("../models/Product");


const getAllProducts = async(req, res) => {
    let data = await productsQuery.getAllProductsFromDb()
                    .catch(err => {
                        return res.json({
                            "message": err
                        })
                    })               
    return res.json(data);
}

const getProductById = async(req, res) => {
    let prod = await productsQuery.getProductFromDb(req.params.id)
    return res.json(prod);
}

const insertProducts = async(req, res) => {
    const {name, brand, costPrice, sellingPrice, details, imageUrls, availableUnits} = req.body
    await productsQuery.insertProductInDb(name, brand, costPrice, sellingPrice, details, imageUrls, availableUnits)
        .then(data => {
            return res.json({
                message: "Data Entered Successfully"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                message: "Data Entry Failed"
            })
        })
}

module.exports = {
    getAllProducts, getProductById, insertProducts
}