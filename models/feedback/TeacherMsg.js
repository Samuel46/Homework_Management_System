const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherMsgSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "teacher",
    },
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


    date: {
        type: Date,
        default: Date.now,
    },
    feedbackId: {
        type: Schema.Types.ObjectId,
        ref: "homework",
    }

});

module.exports = teacherMsg = mongoose.model("teacherMsg", TeacherMsgSchema);