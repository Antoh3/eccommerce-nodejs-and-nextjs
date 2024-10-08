const { fetchTrackByOrderId } = require('../services/trackOrderService')
const { getOrderTrackStatus } = require('../utils/appConfig')
const { Badrequest,Notfound} = require('../utils/appErrors')
const { preparing,shipped,deliverd} = getOrderTrackStatus()


module.exports.checkTrackStatus = async (req,res,next) =>{
    try {
        const orderId = req.params.orderId;
        const status = req.body.status;
        const track = await fetchTrackByOrderId(orderId)

        if(!track) throw new Notfound("Track not found");
        if(track.status === deliverd) throw new Badrequest("Order alredy delivered");
        if (status === preparing || status === shipped || status === deliverd) {
            next()
        }else{
            throw new Badrequest("Invalid track status");
            
        }  
    } catch (error) {
        next(error)
    }
}