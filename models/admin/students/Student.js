const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  code: {
    type: String,
    require: true,
  },
  birth_date: {
    type: Date,
  },

  gender: {
    type: String,
  },
  joining_date: {
    type: Date,
    default: Date.now,
  },
  joining_year_group: {
    type: [String],
  },
  current_year_group: {
    type: [String],
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);
