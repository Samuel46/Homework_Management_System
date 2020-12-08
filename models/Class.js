const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        require: true,
    },
    add_student: {
        type: [String],
        require: true,
    },
    assign_teacher: {
        type: [String],
        require: true,
    }



});

module.exports = Class = mongoose.model("class", ClassSchema);
