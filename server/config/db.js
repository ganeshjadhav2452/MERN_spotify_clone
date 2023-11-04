const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DBURL)

        console.log(`database connected successfuly host name : ${connection.connection.host}`)
    } catch (error) {
        console.log(`error while connecting to mongodb==> ${error}`)
    }
}

module.exports = connectDB