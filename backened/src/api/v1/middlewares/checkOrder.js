const { fetchOrderForPayment } = require('../services/orderService')
const { Notfound,Badrequest} = require('../utils/appErrors')

module.exports.checkOrder  = async (req,res,next) =>{
    try {
        const orderId = req.params.orderId;
        const order = await fetchOrderForPayment(orderId)

        if(!order) throw new Notfound("Order does not exist");
        if (order.paymentDetail) throw new Badrequest("Already paid for this order");

        req.order = order
        next()
    } catch (error) {
        next(error)
    }
}