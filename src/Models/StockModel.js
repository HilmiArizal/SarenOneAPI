const mongoose = require("mongoose");


const stockShcema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Stock", stockShcema);