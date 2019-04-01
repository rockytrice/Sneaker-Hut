const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// Load User model
const User = require("../../models/user");

// user registration route
router.post("/register", (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json({
                errors
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });
            // generate salt with bycrypt and then hash the password
            // set the password to the hash
            // save the user and respond with the user
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }

    })
});

// @route GET api/users/login
// @desc Login User / Return json token
// @access will be Private
// user login route
router.post("/login", (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({
        email
        // promise
    }).then(user => {
        // check for user
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }
        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User matched
                // create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname
                };
                // Sign Token
                // the payload is what we want to include in the token which is some user information!!
                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        });
    });
});

// test route
router.get("/test", (req, res) =>
    res.json({
        msg: "users works"
    })
);


// @route GET api/users/current
// @desc return current user
// @access will be Private
router.get(
    "/current",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            lastname: req.user.lastname,
            email: req.user.email,
        });
    }
);
module.exports = router;