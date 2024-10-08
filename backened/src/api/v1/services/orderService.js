const { Order } = require('../models/DBinit')
const { prisma } = require('../models/DBinit')
const { Badrequest } = require('../utils/appErrors')



module.exports.createOrder = async (userId,address,total,items) => {
    return prisma.$transaction(async (prisma) =>{
        for (let i = 0; i < items.length; i++) {
           let updateProduct = await prisma.product.update({
            where:{
                id:items[i].productId
            },
            data:{
                stock:{
                    decrement:items[i].quantity
                }
            }
           })
           if (updateProduct.stock < 0) throw Badrequest("Stock finished");
        }
        const order = await prisma.order.create({
            data:{
                userId: userId,
                address:address,
                total:total,
                orderDetail:{
                    create:items
                }
            },
        })
        return order;
    });
};


module.exports.fetchOrderByUserId = async (userId) =>{
    return await Order.findMany({
        where:{
            userId:userId
        }
    });
};

module.exports.fetchOrderById = async (orderId) =>{
    return await Order.findUnique({
        where:{
            id:orderId
        },
        include:{
            paymentDetail:true
        }
    })
}

module.exports.fetchOrderForPayment = async (orderId) =>{
    return await Order.findUnique({
        where:{
            id:orderId
        },
        select:{
            address:true,
            total:true,
            orderDetail:{
                select:{
                    productId:true,
                    quantity:true
                }
            }
        }
    })
}

module.exports.updateOrderWithPaymentAndTrack = async (userId,orderId,amount,currency,address) =>{
    return await Order.update({
        where:{
            id:orderId
        },
        data:{
            paymentDetail:{
                create:{
                    userId:userId,
                    amount:amount,
                    currency:currency
                }
            },
            trackOrder:{
                create:{
                    address:address
                }
            }
        }
    })
}

module.exports.deleteOrderById = async (orderId) =>{
    return await Order.delete({
        where:{
            id:orderId
        }
    })
}