const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    }


})

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;