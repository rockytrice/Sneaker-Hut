const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String,
        requried: true,
        unique: 1,
        maxlength: 30
    }
})

const Brand = mongoose.model("brands", BrandSchema);
// solved this error that was happening...(Error: cyclic dependency detected)⬇️
BrandSchema.set("autoIndex", false);

module.exports = Brand;