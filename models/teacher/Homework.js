const mongoose = require("mongoose");

const HomeworkSchema = new mongoose.Schema({
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

    effort_time: {
        type: String,

    },
    allocate_classes: {
        type: [String],

    },
    description: {
        type: String,

    },
    students: {
        type: [String],
        required: true
    },
    set_date: {
        type: Date,
        default: Date.now,
    },
    due_date: {
        type: Date,
        required: true
    },
    attachements: {
        type: [String],

    }

});

module.exports = Homework = mongoose.model("homework", HomeworkSchema);
