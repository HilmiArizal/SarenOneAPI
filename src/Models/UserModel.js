const mongoose = require("mongoose");


const userModel = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        phonenumber: {
            type: Number,
        },
        nickname: {
            type: String,
        },
        img: {
            type: String,
        },
        division: {
            type: String,
        },
        role: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("User", userModel);