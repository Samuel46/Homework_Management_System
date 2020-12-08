const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    subject_name: {
        type: String,
        require: true,
    },
    add_classes: {
        type: [String],
        require: true,
    },
    assign_teachers: {
        type: [String],
        require: true,
    }

});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
