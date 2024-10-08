const cloudinary = require('cloudinary')


const {
    getCloudinaryName,
    getCloudinaryAPIKey,
    getCloudinaryAPISecret
} = require("./appConfig")
const { unlink } = require("fs").promises;


cloudinary.config({
    cloud_name: getCloudinaryName(),
    api_key:getCloudinaryAPIKey(),
    api_secret:getCloudinaryAPISecret()
})


module.exports.cloudinaryUploader = async (localPath) =>{
    const { secur_url, public_id} = await cloudinary.uploader.upload(localPath);
    await unlink(localPath)
    return {
        Image: secur_url,
        cloidId: public_id
    }
}