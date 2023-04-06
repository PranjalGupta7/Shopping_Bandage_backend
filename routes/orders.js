const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orders")


router
    .route("/user/:userId/orders")
    .get(orderController.getOrderDetails)
    .post(orderController.setOrderDetails)

module.exports = router;