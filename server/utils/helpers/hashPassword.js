const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        return hashedPassword
    } catch (error) {
        console.log(error)
        throw new Error('something went wrong while hashing password')

    }
}



module.exports = hashPassword
