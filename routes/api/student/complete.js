const express = require("express");
const router = express.Router();
const Complete = require("../../../models/student/Complete");
const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require('express-validator');
// Multer logics
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


// @route POST /api/student/complete
// description: upload the complete homework
// @access private
router.post(
  "/upload/:id",
  upload.single("file"),
  authStudent,
  async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const work = await Homework.findById(id);
      
      // complete homewok by the student
      const completeWork = new Complete({
        title: work.title,
        teacher: work.teacher,
        subject: work.subject,
        effort_time: work.effort_time,
        allocate_classes: work.allocate_classes,
        description: work.description,
        students: work.students,
        set_date: work.set_date,
        due_date: work.due_date,
        attachements: req.file.path,
        student: req.student.id,
        filename: req.file.originalname,
        isComplete: req.body.isComplete,
        completeStudentWork: req.body.completeStudentWork,
      });

      const homeDone = await completeWork.save();
      res.json(homeDone);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);





// @Route Get   api/student/homework
// @Descri         Get all complete homework
// @Access         Private
router.get("/", authStudent || authTeacher, async (req, res) => {
  try {
    const homeWork = await Complete.find({ student: req.student.id }).populate(
      "student",
      ["name", "email"]
    );

    res.json(homeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Delete api/student/complete/:id
// description: Delete homework usign ID after submiting the complete homework object
// @access private

router.delete("/:id", authStudent || authTeacher, async (req, res) => {
  try {
    const deleteHomework = await Complete.findById(req.params.id);
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
