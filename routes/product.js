const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");


router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.insertProducts)

module.exports = router;