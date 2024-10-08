const { Product } = require('../models/DBinit')


module.exports.createProduct = async (product) =>{
    return await Product.create({
        data: product
    })
}

module.exports.fetchProduct = async (productId) =>{
    return await Product.findUnique({
        where:{
            id:productId
        }
    })
}

module.exports.fetchProductSearchResults = async (arg) =>{
    return await Product.findMany({
        where:{
            name: {
                search: arg
            }
        }
    })
}

module.exports.fetchProductWithPagination = async (category,skip,take) =>{
    let products;

    if (category) {
        products = await Product.findMany({
            skip:skip,
            take:take,
            where:{
                category:{
                    categoryName:category
                }
            }
        })
    } else {
        products = await Product.findMany({
            skip:skip,
            take:take
        })
    }

    return products;
}

module.exports.fetchProductsForCart = async (productId) =>{
    return await Product.findUnique({
        where:{
            id:productId
        },
        select:{
            name:true,
            price:true,
            stock:true
        }
    })
}

module.exports.fetchProductForReview = async (productId) =>{
    return await Product.findUnique({
        where:{
            id:productId
        },
        select:{
            reviews:true
        }
    })
}


module.exports.updateProductsForOrder = async (item) =>{
    const updateProduct = await Product.update({
        where:{
            id:item.productId
        },
        data:{
            stock:{
                decrement:item.quantity
            }
        }
    })

    return updateProduct
}

module.exports.updateProductStock = async (productId,stock) =>{
    return await Product.update({
        where:{
            id:productId
        },
        data:{
            stock:{
                increment:stock
            }
        }
    })
}