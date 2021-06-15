const mongoose = require("mongoose");

const UploadsSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  filename: {
    type: String,
    require: true,
  },
  attachements: {
    type: [String],
    required: true,
  },
  uploadtime: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Homework = mongoose.model("uploads", UploadsSchema);
