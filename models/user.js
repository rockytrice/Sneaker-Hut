const mongoose = require("mongoose");
const Schema = mongoose.Schema


const UserSchema = new Schema({
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
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

const User = mongoose.model("users", UserSchema);

UserSchema.set("autoIndex", false);

module.exports = User;