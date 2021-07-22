const express = require("express");
const router = express.Router();
const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const authParent = require("../../../middleware/authParent");
const Student = require("../../../models/admin/students/Student");
const Class = require("../../../models/admin/classes/Class");

// @Route Get   api/student/homework
// @Descri      Get all homework @@ pending homework
// @Access      Private
router.get("/", authStudent || authParent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");

    const homeWork = await Homework.find({
      students: student.firstname + " " + student.sirname,
    }).populate("teacher", ["name", "email"]);

    res.json(homeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/student/homework/work
// @Descri      Get all classes associate with this student @@ pending homework
// @Access      Private
router.get("/work", authStudent || authParent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    const classrooms = await Class.find({
      add_students: student.firstname + " " + student.sirname,
    }).populate("user", ["name", "email"]);

    res.json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/student/homework/classroom
// @Descri      Get all homewoek associate with this student @@ using the classroom
// @Access      Private
router.get("/classroom", authStudent || authParent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    const classrooms = await Class.find({
      add_students: student.firstname + " " + student.sirname,
    }).populate("user", ["name", "email"]);

    const myClassrooms = Array.prototype.concat(
      ...classrooms.map((room) => room.name.split())
    );
    const homework = await Homework.find({
      allocate_classes: { $in: myClassrooms },
    }).populate("teacher", ["name", "email"]);
    res.json(homework);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// // @Route Get   api/student/homework
// @Descri         Get homework by ID
// @Access         Private
router.get("/:id", authStudent || authParent, async (req, res) => {
  try {
    const homeWorkId = await Homework.findById(req.params.id).populate(
      "teacher",
      ["name", "email"]
    );
    if (!homeWorkId) {
      return res.status(404).json({ msg: "Homework not found" });
    }

    res.json(homeWorkId);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Homework not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/teacher/homework/:id
// description: Delete homework ID
// @access private

router.delete("/:id", authStudent || authParent, async (req, res) => {
  try {
    const deleteHomework = await Homework.findById(req.params.id);
    if (!deleteHomework) {
      return res.status(404).json({ msg: "Homework not found" });
    }
    await deleteHomework.remove();
    res.json({ msg: "Homework removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
