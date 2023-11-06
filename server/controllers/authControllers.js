const User = require('../models/User.js');
const generateJWT = require('../utils/helpers/generateJWT.js');
const hashPassword = require('../utils/helpers/hashPassword.js')
const verifyHashedPassword = require('../utils/helpers/verifyPassword.js')


module.exports = {
    registerUser: async (req, res) => {
        const { firstName, lastName, email, password, userName } = req.body;
        try {
            // validations 
            if (!firstName || !lastName || !email || !password || !userName) {
                return res.status(401).json({
                    success: false,
                    error: 'Please Fill All Required Information .'
                })
            }
            // finding user if exists already 
            const isUserExists = await User.findOne({ email: email })
            if (isUserExists) {
                return res.status(403).json({
                    success: false,
                    error: 'A user with this email id already exists .'
                })
            }

            // creating new user if not exists in database

            const hashedPassword = await hashPassword(password)
            const user = await User.create({
                firstName,
                lastName,
                password: hashedPassword,
                userName,
                email
            })

            // creating a jwt token for user request verification
            const token = await generateJWT(user)

            // sending success response 
            const response = { ...user._doc };
            console.log(response)
            delete response.password

            return res.status(200).json({
                success: true,
                ...response,
                token
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },

    loginUser: async (req, res) => {
        const { password, email } = req.body;
        try {
            //checking user is registered or not

            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'A user with this email id is not exists .'
                })
            }

            // if user is registered then checking the password
            console.log(password, user.password)
            const verifyPassword = await verifyHashedPassword(password, user.password)
            if (user.email === email && verifyPassword) {
                // generating login token jwt
                let token = await generateJWT(user)
                let response = { ...user }
                delete response.password

                return res.status(200).json({
                    success: true,
                    token,
                    response

                })
            }
            return res.status(403).json({
                success: false,
                error: 'invalid password '
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: ' something went wrong from server side while logging you in '
            })
        }
    }
}