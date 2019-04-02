const express = require("express");
const router = express.Router();

const Product = require("../../models/addProduct");

router.post("/add", (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    product.save().then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        product
    })

});

module.exports = router;