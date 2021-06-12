const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Subject = require("../../../models/admin/subjects/Subject");
const auth = require("../../../middleware/auth");
const Teacher = require("../../../models/admin/Teacher");
const Class = require("../../../models/admin/classes/Class");
const Student = require("../../../models/admin/students/Student");

// @Route Get   api/teacher/teacher
// @Descri      Get all subjects from admin @@ teacher level
// @Access      Private
router.get("/subject", authTeacher || auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    const allSubject = await Subject.find({
      assign_teachers: teacher.name,
    });

   

    res.json(allSubject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/teacher/teacher
// @Descri      Get all classromms from admin by teacher name @@ teacher level
// @Access      Private

router.get("/classRoom", authTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    const allClass = await Class.find({ assign_teachers: teacher.name });

    res.json(allClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get  /api/teacher/teacher/students
// @Descri         Get all Students @ teacher level
// @Access         Private
router.get("/students", authTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    const allStudents = await Student.find({ user: teacher.user });

    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
