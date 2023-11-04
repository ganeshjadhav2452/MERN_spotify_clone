const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/routes')
const connectDB = require('./config/db')


const app = express()
app.use(router)
app.use(cors())

connectDB().then(() => {
    app.listen(process.env.PORT, (res) => console.log('server startedd on port :', process.env.PORT))
}).catch((err) => {
    console.log(err)
})
