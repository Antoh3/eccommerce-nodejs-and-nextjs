const { fetchProductsForCart } = require('../services/productService')
const {
    fetchProductsForCart,
    createEmptyCart,
    fetchCartAndItems,
    findExistingProduct
} = require('../services/cartService')
const { Notfound } = require('../utils/appErrors')



module.exports.checkCurrentUserCart = async (req,res,next) => {
    try {
        const userId = req.user.id
        let cart = await fetchCartAndItems(userId)
        if (!cart) {
            cart = createEmptyCart()
        }
        req.cart = cart
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.checkCartItemAvailability = async (req,res,next) =>{
    try {
        const cart = req.cart
        const productId = req.params.productId
        const productIndex = findExistingProduct(cart.items, productId)

        if (productIndex === -1) {
            req.availablity = false
        }else{
            req.availablity = true
            req.productIndex = productIndex
        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.checkProductAvailability = async (req,res,next) =>{
    try {
        const { productId } = req.params
        const product = await fetchProductsForCart(productId)

        if(!product) throw new Notfound("Product not available");
        req.product = product
        next()
    } catch (error) {
        next(error)
    }
}