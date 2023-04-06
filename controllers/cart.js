const cartQuery = require("../models/Cart");
const productQuery = require("../models/Product");

const getCart = async (req, res) => {
  let cartItems=[];
  let totalAmount = 0;
  const query = await cartQuery.getCartDetailsFromDb(req.params.userId);

  for (var i = 0; i < query.length; i++) {
    const prod = await productQuery.getProductFromDb(query[i].productId);
    cartItems.push({
      product: prod[0],
      quantity: query[i].quantity,
    });
    totalAmount += Number(query[i].amount)
  }
  res.send({
        userId: req.params.userId,
        cartItems,
        totalAmount,
    });
};

const addToCart = async (req, res) => {
  const { productId } = req.body;
  await cartQuery
    .addItemToCartInDb(req.params.userId, productId)
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Some Error Occured",
      });
    });
    
    return res.json({
      status: "Success"
    })
};

const deleteItemFromCart = async (req, res) => {
  const { deleteProductId } = req.query;
  await cartQuery
    .deleteItemFromCartDb(req.params.userId, deleteProductId)
    .then((data) => {
      res.json({ 
        status: "Success"
       });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Some Error Occured",
      });
    });
};

const changeQuantityOfItemInCart = async (req, res) => {
  const { productId, quantity } = req.body;
  await cartQuery
    .changeQtyOfIteminDb(req.params.userId, productId, quantity)
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Some Error Occured",
      });
    });

    return res.json({
      status: "Success"
    });
};

const emptyCart = async (req, res) => {
  const {userId} = req.params
  await cartQuery.clearCartDb(userId)
  .catch(err => {
    return res.json({
      "message": "Some Error Occured"
    })
  })

  return res.json({
    "status": "Success"
  })
}

module.exports = {
  getCart,
  addToCart,
  deleteItemFromCart,
  changeQuantityOfItemInCart,
  emptyCart
};
