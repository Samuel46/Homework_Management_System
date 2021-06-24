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
  },
  set_date: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
  },
  attachements: {
    type: [String],
  },
  filename: {
    type: String,
    require: true,
  },
  uploadtime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Homework = mongoose.model("homework", HomeworkSchema);
