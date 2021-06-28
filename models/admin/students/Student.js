const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,

    },
    code: {
        type: String,
        require: true,
    },
    birth_date: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,

    },
    joining_date: {
        type: Date,
        default: Date.now,
    },
    joining_year_group: {
        type: [String],
        required: true,
    },
    current_year_group: {
        type: [String],
        required: true,
    },



});

module.exports = Student = mongoose.model("student", StudentSchema);
