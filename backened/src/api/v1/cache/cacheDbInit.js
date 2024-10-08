const { createClient } = require("redis")
const {
    getRedisHost,
    getRedisPort,
    getRedisUrl
} = require("../utils/appConfig")

const host  = getRedisHost()
const port = getRedisPort()
const url = getRedisUrl()

const options = { url: url}
const cacheClient = createClient(options)


module.exports.cacheClient = cacheClient;