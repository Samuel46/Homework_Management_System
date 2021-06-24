const mongoose = require("mongoose");

const CompleteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  title: {
    type: String,
    require: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parent",
  },
  subject: {
    type: [String],
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
    required: true,
  },
  set_date: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
    required: true,
  },
  attachements: {
    type: String,
  },
  isComplete: {
    type: Boolean,
  },

  completeStudentWork: {
    type: String,
  },
  filename: {
    type: String,
  },
  completeTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Complete = mongoose.model("complete", CompleteSchema);
