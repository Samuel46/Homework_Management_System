const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const authStudent = require("../../../middleware/authStudent");
const Complete = require("../../../models/student/Complete");
const Student = require("../../../models/admin/students/Student");


// @Route Get      api/teacher/homework
// @Descri         Get all complete homework from the student @@@ teacher level
// @Access         Private
router.get("/", authTeacher || authStudent, async (req, res) => {
  try {
   
    const homeWork = await Complete.find({ teacher: req.teacher.id }).populate(
        "student",
        ["name", "email"]
      );

    res.json(homeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/teacher/homework/complete
// @Descri         Get complete homework by Id @@teacher level
// @Access         Private
router.get("/:id", authTeacher || authStudent, async (req, res) => {
  try {
    const homeWorkId = await Complete.findById(req.params.id).populate(
      "student",
      ["name", "username"]
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

// @Route Delete   api/teacher/homework/complete/:id
// @Descri         Delete complete homework by Id @@teacher level
// @Access         Private
router.delete("/:id", authTeacher || authStudent, async (req, res) => {
  try {
    const deleteHomeWorkId = await Complete.findById(req.params.id).populate(
      "student",
      ["name", "username"]
    );
    if (!deleteHomeWorkId) {
      return res.status(404).json({ msg: "Homework not found" });
    }

    await deleteHomeWorkId.remove();
    res.json({ msg: "Complete homework removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Homework not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
