const { User } = require('../models/DBinit')
const { cacheClient } = require('../cache/cacheDbInit')
const {
    getVerifyEmailEX,
    getRefreshTokenCacheEX
} = require('../utils/appConfig')


module.exports.createUser = async(name,email,password) =>{
    return await User.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
}

module.exports.fetchUserByEmail = async(email) =>{
    return await User.findUnique({
        where:{
            email:email
        }
    })
}

module.exports.fetchUserById = async (userId) =>{
    return await User.findUnique({
        where:{
            id:userId
        }
    })
}

module.exports.updateUserPassword = async (userId,newPassword) =>{
    return await User.update({
        where:{
            id:userId
        },
        data:{
            password:newPassword
        }
    })
}

// signup  accesstoken
module.exports.setUserSignUpCache = async (email,user) =>{
    const verifyEmailEX = getVerifyEmailEX()
    await cacheClient.set(email,JSON.stringify(user),{ EX:verifyEmailEX });
}

module.exports.getUserSignUpCache = async (email) =>{
    return JSON.parse(await cacheClient.get(email));
}

module.exports.deleteUserSignUpCache = async (email) =>{
    await cacheClient.del(email);
}

// Refresh Token
module.exports.setUserRefreshToken = async (email,refreshToken) =>{
    const refreshTokenCacheEX = getRefreshTokenCacheEX()
    await cacheClient.set(email,refreshToken,{ EX: refreshTokenCacheEX})
}

module.exports.getUserRefreshToken = async (email) =>{
    return await cacheClient.get(email)
}

module.exports.deleteUserRefreshToken = async (email) =>{
    await cacheClient.del(email)
}