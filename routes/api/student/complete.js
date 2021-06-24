const express = require("express");
const router = express.Router();
const Complete = require("../../../models/student/Complete");
const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const config = require("config");

// s3 uploader
require("dotenv/config");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const s3 = new aws.S3({
  accessKeyId: config.get("AWS_ID"),
  secretAccessKey: config.get("AWS_SECRET"),
  Bucket: config.get("AWS_BUCKET_NAME"),
});

/**
 * Single Upload
 */
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get("AWS_BUCKET_NAME"),
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 200000000 }, // In bytes: 2000000 bytes = 2 MB
}).single("file");

// @route POST /api/student/complete
// description: upload the complete homework
// @access private
router.post("/upload/:id", upload, authStudent, async (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check if there is a file
  if (req.file !== undefined) {
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
        attachements: req.file.location,
        student: req.student.id,
        filename: req.file.key,
        isComplete: req.body.isComplete,
        completeStudentWork: req.body.completeStudentWork,
      });

      const homeDone = await completeWork.save();
      res.json(homeDone);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //
  } else {
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

        student: req.student.id,

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
});

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
