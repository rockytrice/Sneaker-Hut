const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //   if its not empty it will be whatever it is and if it is empty its just be an empty string and it will get tested below as an empty string at line 24.
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";

    // the name on the registration is atleast 2 characters and no longer than 30 characters.
    if (
        !Validator.isLength(data.name, {
            min: 2,
            max: 30
        })
    ) {
        errors.name = "Name must be between 2 and 30 characters";
    }
    if (
        !Validator.isLength(data.lastname, {
            min: 2,
            max: 30
        })
    ) {
        errors.name = "Last Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.name = "Last Name field is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 20
        })) {
        errors.password = "password must be atleast 6 characters";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};