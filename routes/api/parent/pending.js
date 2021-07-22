const express = require("express");
const router = express.Router();
// const authTeacher = require("../../../middleware/authTeacher");

const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const authParent = require("../../../middleware/authParent");
const Parent = require("../../../models/student/Parent");

// @Route Get   api/student/homework
// @Descri      Get all homework @@ pending homework
// @Access      Private
router.get("/", authParent || authStudent, async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent.id).populate("student", [
      "firstname",
      "sirname",
    ]);

    const pendingWork = await Homework.find({
      students: parent.student.firstname + " " + parent.student.sirname,
    }).populate("teacher", ["firstname", "sirname", "title"]);

    res.json(pendingWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // @Route Get   api/student/homework
// @Descri         Get homework by ID
// @Access         Private
router.get("/:id", authParent || authStudent, async (req, res) => {
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

module.exports = router;
