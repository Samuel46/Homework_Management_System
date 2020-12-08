const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherMsgSchema = new Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "homework",
    }

});

module.exports = teacherMsg = mongoose.model("teacherMsg", TeacherMsgSchema);