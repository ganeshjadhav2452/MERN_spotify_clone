const bcrypt = require('bcrypt')


const verifyHashedPassword = async (password, hashedPassword) => {
    try {
        const isVerify = await bcrypt.compare(password, hashedPassword)
        console.log('isVerify', isVerify)
        return isVerify
    } catch (error) {
        console.log(error)
        throw new Error('something went wrong while verifying password')

    }
}



module.exports = verifyHashedPassword
