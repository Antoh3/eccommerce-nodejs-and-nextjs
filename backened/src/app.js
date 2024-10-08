const express = require('express')

const app = express()



app.listen(3000, async () => {
    try {
        console.log("Server running on port 3000");
    } catch (error) {
        console.error(error);
        
    }
})