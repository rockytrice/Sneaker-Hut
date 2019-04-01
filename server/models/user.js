const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 20
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;