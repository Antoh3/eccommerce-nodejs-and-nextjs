const { Review } = require('../models/DBinit')

module.exports.createReview = async (userId,productId,orderId,comment,rating) =>{
    return await Review.create({
        data:{
            userId:userId,
            productId:productId,
            orderId:orderId,
            comment:comment,
            rating:rating
        }
    })
}

module.exports.fetchReviewsByProductId = async (productId) =>{
     return await Review.findUnique({
        where:{
            productId:productId
        }
     })
}

module.exports.fetchReviewsByUserProductId = async (userId,productId) =>{
    return await Review.findUnique({
        where:{
            "userId_productId":{
                userId:userId,
                productId:productId
            }
        }
    })
}

module.exports.updateReviewById = async (reviewId,comment,rating) =>{
    return await Review.update({
        where:{
            id:reviewId
        },
        data:{
            comment:comment,
            rating:rating
        }
    })
}