const { sign,verify} = require('jsonwebtoken')


const {
    getAccessTokenSecret,
    getRefreshTokenSecret,
    getVerificationSecret,
    getPasswordResetSecret,
    getAccessTokenTtl,
    getRefreshTokenTtl,
    getVerificationTokenTtl,
    getPasswordResetTokenTtl
} = require("./appConfig")


const accessTokenSecret = getAccessTokenSecret()
const refreshTokenSecret =  getRefreshTokenSecret()
const verificationSecret = getVerificationSecret()
const passwordResetSecret = getPasswordResetSecret()

const accessTokenTtl = getAccessTokenTtl()
const refreshTokenTtl = getRefreshTokenTtl()
const verificationTokenTtl = getVerificationTokenTtl()
const passwordResetTokenTtl = getPasswordResetTokenTtl()

module.exports.generateAccessToken = (email,id,role) =>{
    const payload = { email:email, id:id, role:role}
    const secret = accessTokenSecret;
    const options = { expiresIn: accessTokenTtl }
    const token = sign(payload,secret,options)
    return token;
}

module.exports.generateRefreshToken = (email,id,role) =>{
    const payload = { email:email, id:id, role:role}
    const secret = refreshTokenSecret
    const options = { expiresIn: refreshTokenTtl}
    const token = sign(payload,secret,options)

    return token;
}

module.exports.generateVerificationToken = (email) => {
    const payload = {email:email}
    const secret = verificationSecret;
    const options = { expiresIn : verificationTokenTtl}
    const token = sign(payload,secret,options)

    return token;
}

module.exports.generatePasswordResetToken = (email,oldPassword) =>{
    const payload = { email:email, oldPassword:oldPassword}
    const secret = passwordResetSecret + oldPassword
    const options = { expiresIn: passwordResetTokenTtl}
    const token = sign(payload,secret,options)

    return token;
}

module.exports.decodeAccessToken = (accessToken) =>{
    return verify(accessToken, accessTokenSecret)
}

module.exports.decodeRefreshToken = (refreshToken) =>{
    return verify(refreshToken, refreshTokenSecret)
}

module.exports.decodeVerificationToken = (verificationToken) =>{
    return verify(verificationToken,verificationSecret)
}

module.exports.decodePasswordRestToken = (passwordResetToken,currentPassword) =>{
    const secret = passwordResetSecret + currentPassword
    return verify(passwordResetToken,secret)
}

module.exports.getTokenFromTokenHeader = (tokenHeader) =>{
    return tokenHeader.split(" ")[1].trim();
}