const { genSalt, hash, compare} = require("bcrypt")
const saltRounds = require("./appConfig").getSaltRounds()


module.exports.generateHashedPaasword = async (plainPassword) =>{
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(plainPassword, salt)
    return hashedPassword;
}

module.exports.compareHashedPassword = async (passwordInput,hashedPassword) => {
    return await compare(passwordInput,hashedPassword)
}