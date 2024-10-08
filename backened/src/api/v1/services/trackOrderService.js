const { Track_order } = require('../models/DBinit')

module.exports.fetchTrackByOrderId = async (orderId) =>{
    return await Track_order.findUnique({
        where:{
            orderId:orderId
        }
    })
}


module.exports.updateTrackStatusByOrderId = async (orderId,status) =>{
    return await Track_order.update({
        where:{
            orderId:orderId
        },
        data:{
            status:status
        }
    })
}