const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        name: {
            type: String,
        },
        price: {
            type: String,
        },
        weight: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Product", productSchema);