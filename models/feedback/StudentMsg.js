const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentMsgSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "student",
    },
    title: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        required: true,

    },

    text: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        require: true,
    },


    date: {
        type: Date,
        default: Date.now,
    },
    feedbackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "homework",
    }

});

module.exports = studentMsg = mongoose.model("studentMsg", StudentMsgSchema);