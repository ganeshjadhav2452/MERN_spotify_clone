const dotenv = require("dotenv").config();
const User = require('../../models/User')
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require('passport')




const passportJWT = async () => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = process.env.PASSPORT_SECREATE_KEY;

    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            console.log(jwt_payload)
            try {
                const user = await User.findOne({ id: jwt_payload.sub });
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            } catch (error) {
                console.log(err)
                return done(err, false);
            }
        })
    );
};

module.exports = passportJWT;
