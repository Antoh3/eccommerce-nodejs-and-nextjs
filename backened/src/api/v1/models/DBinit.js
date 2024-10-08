const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;


module.exports =  {
    User:prisma.user,
    Profile:prisma.profile,
    Category: prisma.category,
    Product: prisma.product,
    Review: prisma.reviews,
    Cart: prisma.cart,
    CartItem: prisma.cart_item,
    Order: prisma.order,
    Payment_detail: prisma.payment_detail,
    Order_detail: prisma.order_detail,
    Track_order: prisma.track_order,
    prisma: prisma
}