const mongoose = require("mongoose");

const ClassRoomSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
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
});

module.exports = ClassRoom = mongoose.model("classroom", ClassRoomSchema);
