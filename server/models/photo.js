const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        photo: {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model("Photo", photoSchema);