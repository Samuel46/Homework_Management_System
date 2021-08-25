const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  firstname: {
    type: String,
    require: true,
  },
  sirname: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  create_class: {
    type: Boolean,
  },
  allocate_classes: {
    type: [String],
  },

  profile_image: {
    type: String,
  },
  joining_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Teacher = mongoose.model("teacher", TeacherSchema);
