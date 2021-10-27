const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        fullname: {
            type: String,
        },
        nickname:{
            type: String,
        },
        phonenumber: {
            type: Number,
        },
        division: {
            type: String,
        },
        motto: {
            type: String,
        },
        role:{
            type: String
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Team", teamSchema);