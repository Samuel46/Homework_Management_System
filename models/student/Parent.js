const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        ref: "teacher",
    },
    name: {
        type: String,
        required: true,

    },
});

module.exports = Parent = mongoose.model("parent", ParentSchema);