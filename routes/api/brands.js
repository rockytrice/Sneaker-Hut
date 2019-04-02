const express = require("express");
const router = express.Router();

const Brand = require("../../models/brands");

router.post("/brand", (req, res) => {
    const brand = new Brand({
        name: req.body.name
    })
    brand.save().then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        brand
    })
})





module.exports = router;