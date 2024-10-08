const {
    decodeAccessToken,
    decodeRefreshToken,
    getTokenFromTokenHeader
} = require('../utils/jwt')
const { getUserRefreshToken } = require('../services/userService')
const { Badrequest,Forbidden,Unauthorized} = require('../utils/appErrors')

module.exports.authorizeAccess = ( req,res,next) =>{
    try {
        const tokenHeader = req.header('Authorization')
        const token = getTokenFromTokenHeader(tokenHeader)
        const decode = decodeAccessToken(token)
        req.user = decode
        next();
    } catch (error) {
        if (error.name === 'TypeError') {
            next(new Badrequest('No token provided'))
        }else if (error.name === 'JsonWebTokenError') {
            next(new Badrequest('Invalid Token'))
        }else if (error.name === 'TokenExpiredError') {
            next(new Badrequest('Token Expired'))
        }else{
            next(error)
        }
    }
}

module.exports.authorizeRefresh = async (req,res,next) =>{
    try {
        const tokenHeader = req.header('Authorization')
        const token = getTokenFromTokenHeader(tokenHeader)
        const decoded = decodeRefreshToken(token)
        const tokenCache = await getUserRefreshToken(decoded.emal)
        if (tokenCache === token) {
            req.user = decoded
            next()
        }else{
            throw new Unauthorized("Invalid refresh token");
        }
    } catch (error) {
        if (error.name === 'TypeError') {
            next(new Badrequest('No token provided'))
        }else if (error.name === 'JsonWebTokenError') {
            next(new Badrequest('Invalid Token'))
        }else if (error.name === 'TokenExpiredError') {
            next(new Badrequest('Token Expired'))
        }else{
            next(error)
        }
    }
}

module.exports.authorizeAdmin = (req,res,next) =>{
    try {
        if (req.user.role !== 'ADMIN') {
            throw new Forbidden("Access denied");
            
        } else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports.authorizeEmployee = (req,res,next) =>{
    try {
        if (req.user.role !== 'EMPLOYEE') {
            throw new Forbidden("Access denied");
            
        } else{
            next()
        }
    } catch (error) {
        next(error)
    }
}