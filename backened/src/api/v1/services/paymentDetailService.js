const { Payment_detail } = require('../models/DBinit')

module.exports.fetchPaymentByOrderId = async (orderId) =>{
    return await Payment_detail.findUnique({
        where:{
            orderId: orderId
        }
    })
}