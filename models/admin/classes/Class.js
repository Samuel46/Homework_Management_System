const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    require: true,
  },
  add_students: {
    type: [String],
    require: true,
  },
  add_subjects: {
    type: [String],
    require: true,
  },
  assign_teachers: {
    type: [String],
    require: true,
  },
});

module.exports = Class = mongoose.model("class", ClassSchema);
