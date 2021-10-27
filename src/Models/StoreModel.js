const mongoose = require("mongoose");


const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Store", storeSchema);