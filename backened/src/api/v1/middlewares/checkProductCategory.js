const { fetchCategory } = require('../services/categoryService')
const { Badrequest }  = require('../utils/appErrors')


module.exports.checkProductCaregory = async (req,res,next) =>{
    try {
        const product = req.body
        const category = await fetchCategory(product.category)
        if(!category) throw new Badrequest("Invalid category name");
        req.categoryId = category.id
        next()
    } catch (error) {
        next(error)
    }
}