const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
    try {
        const token = jwt.sign({ identifier: user._id }, process.env.PASSPORT_SECREATE_KEY)

        return token
    } catch (error) {
        console.log(error)
        throw new Error('something went wrong while generating jwt')
    }
}


module.exports = generateJWT;