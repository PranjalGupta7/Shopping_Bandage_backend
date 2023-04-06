const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router
  .route("/user/:userId/cart")
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .delete(cartController.deleteItemFromCart)
  .patch(cartController.changeQuantityOfItemInCart);

router.delete("/user/:userId/emptyCart", cartController.emptyCart)

module.exports = router;
