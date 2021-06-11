const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  create_class: {
    type: Boolean,
  },
  allocate_classes: {
    type: [String],
    required: true,
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
