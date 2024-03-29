const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const ClassRoom = require("../../../models/teacher/ClassRoom");

// @route POST api/teacher/classroo
// @descri    Creating new class object
// @access public
router.post(
  "/",

  [
    authTeacher,
    [
      check("name", "Class name is required").not().isEmpty(),
      check("add_students", "Add students is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, add_subjects, add_students } = req.body;

    // Bulilding a class object
    const classFields = {};
    classFields.teacher = req.teacher.id;
    if (name) classFields.name = name;
    if (add_students) classFields.add_students = add_students;
    if (add_subjects) classFields.add_subjects = add_subjects;
    try {
      // see if user exists
      let classRoom = await ClassRoom.findOne({ name });

      if (classRoom) {
        // update the classrroms
        classRoom = await ClassRoom.findOneAndUpdate(
          { name },
          { $set: classFields },
          { new: true }
        );
        return res.json(classRoom);
      }

      //   create new class object
      classRoom = new ClassRoom(classFields);

      // saving the new class to the database
      await classRoom.save();
      // return the new class object
      res.json({ classRoom });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @Route Get   api/teacher/classroom
// @Descri         Get all classes @@ teacer level
// @Access         Private
router.get("/", authTeacher, async (req, res) => {
  try {
    const classRooms = await ClassRoom.find({
      teacher: req.teacher.id,
    }).populate("student", ["firstname", "sirname"]);

    res.json(classRooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   /api/admin/teacher/classRoom
// @Descri      Get classRoom by Id @@teacher level
// @Access      Private
router.get("/:id", authTeacher, async (req, res) => {
  try {
    const getClassById = await ClassRoom.findById(req.params.id)
      .populate("teacher", ["firstname", "sirname", "title"])
      .populate("student", ["firstname", "sirname"]);
    if (!getClassById) {
      return res.status(404).json({ msg: "ClassRoom not found" });
    }

    res.json(getClassById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "ClassRoom not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/admin/classes/class:id
// description: Delete class by ID
// @access private

router.delete("/:id", authTeacher, async (req, res) => {
  try {
    const deleteClass = await ClassRoom.findById(req.params.id);
    if (!deleteClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    await deleteClass.remove();
    res.json({ msg: "Class removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
