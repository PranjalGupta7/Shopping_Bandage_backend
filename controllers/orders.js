const orderQuery = require('../models/Orders')
const productQuery = require('../models/Product')
const cartQuery = require('../models/Cart')

const getOrderDetails = async(req, res) => {
    let data = await orderQuery.getOrderDetailsFromDb(req.params.userId)
                .catch(err => console.log(err))
    // let responseOfOrders = []
    // let productArray = []
    // data.forEach(async element => {
    //     productArray.push({
    //         "orderId": element.id,
    //         "orderStatus": element.orderStatus,
    //         "paymentStatus": element.paymentStatus,
    //         "product": await productQuery.getProductFromDb(product.id),
    //         "quantityOrdered": product.quantity
    //     })
    
    // });
    // responseOfOrders.push({
    //     "transactionNumber": data[0],
    //     "products": productArray
    // })
    return res.json(data)
}

const setOrderDetails = async (req, res) => {
    const {productDetails} = req.body
    var timeStamp = Date.now()
    var transactionNumber = randomString(10)
    for(var i=0; i<productDetails.length; i++){
        await orderQuery.insertOrderDetailsInDb(req.params.userId, productDetails[i], transactionNumber, timeStamp)
        .catch(err => {
            console.log(err)
        })
    }
    await cartQuery.clearCartDb(req.params.userId)
    return res.json({
        transactionNumber: transactionNumber 
    })
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

module.exports = {
    getOrderDetails, setOrderDetails
}