const JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                // if the user is found, return done function and the user
                if (user) {
                    return done(null, user)
                }
                // if user not found, return done with the null for the first param. and false for the second cause there is no user found
                return done(null, false);

            })
            .catch(err => console.log(err))
    }));
}