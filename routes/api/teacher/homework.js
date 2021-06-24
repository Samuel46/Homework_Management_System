const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const Complete = require("../../../models/student/Complete");
const Student = require("../../../models/admin/students/Student");

const config = require("config");
// s3 uploader
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

// @route POST api/teacher/homework
// @descri    Creating new homework
// @access public
router.post(
  "/upload",
  upload,

  [
    authTeacher || authStudent,
    [
      check("title", "Title is required").not().isEmpty(),
      check("effort_time", "Effort time is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("set_date", "Set date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // save both file inputs and text input
    if (req.file !== undefined) {
      const {
        title,
        subject,
        effort_time,
        allocate_classes,
        description,
        students,
        set_date,
        due_date,
      } = req.body;

      // Bulilding homework object
      const homeworkFields = {};
      homeworkFields.teacher = req.teacher.id;
      homeworkFields.attachements = req.file.location;
      homeworkFields.filename = req.file.key;
      if (title) homeworkFields.title = title;
      if (subject)
        homeworkFields.subject = subject.split(",").map((sub) => sub);
      if (effort_time) homeworkFields.effort_time = effort_time;
      if (set_date) homeworkFields.set_date = set_date;
      if (due_date) homeworkFields.due_date = due_date;
      if (description) homeworkFields.description = description;
      if (allocate_classes)
        homeworkFields.allocate_classes = allocate_classes
          .split(",")
          .map((room) => room);

      if (students)
        homeworkFields.students = students.split(",").map((student) => student);

      try {
        // see if homework exists
        // {
        //   req.file !== undefined ?
        // }
        let homework = await Homework.findOne({ title });

        if (homework) {
          // update the homework by the teacher
          homework = await Homework.findOneAndUpdate(
            { title },
            { $set: homeworkFields },
            { new: true }
          );
          return res.json(homework);
        }

        //create new homework abject
        homework = new Homework(homeworkFields);

        //Save homework to database
        await homework.save();
        // return homewoek
        res.json({ homework });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    } else {
      // save only text inputs
      const {
        title,
        subject,
        effort_time,
        allocate_classes,
        description,
        students,
        set_date,
        due_date,
      } = req.body;

      // Bulilding homework object
      const homeworkFields = {};
      homeworkFields.teacher = req.teacher.id;
      if (title) homeworkFields.title = title;
      if (subject)
        homeworkFields.subject = subject.split(",").map((sub) => sub);
      if (effort_time) homeworkFields.effort_time = effort_time;
      if (set_date) homeworkFields.set_date = set_date;
      if (due_date) homeworkFields.due_date = due_date;
      if (description) homeworkFields.description = description;
      if (allocate_classes)
        homeworkFields.allocate_classes = allocate_classes
          .split(",")
          .map((room) => room);
      if (students)
        homeworkFields.students = students.split(",").map((student) => student);

      try {
        // see if homework exists

        let homework = await Homework.findOne({ title });

        if (homework) {
          // update the homework by the teacher
          homework = await Homework.findOneAndUpdate(
            { title },
            { $set: homeworkFields },
            { new: true }
          );
          return res.json(homework);
        }

        //create new homework abject
        homework = new Homework(homeworkFields);

        //Save homework to database
        await homework.save();
        // return homewoek
        res.json({ homework });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

// @Route Get   api/teacher/homework
// @Descri         Get all homework
// @Access         Private
router.get("/", authTeacher, async (req, res) => {
  try {
    const homeWork = await Homework.find({ teacher: req.teacher.id }).populate(
      "teacher",
      ["name", "email"]
    );

    res.json(homeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/teacher/homework
// @Descri      Get homework by Id @@teacher level
// @Access      Private
router.get("/:id", authTeacher, async (req, res) => {
  try {
    const getWorkById = await Homework.findById(req.params.id).populate(
      "user",
      ["email", "name"]
    );
    if (!getWorkById) {
      return res.status(404).json({ msg: "Homework not found" });
    }

    res.json(getWorkById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Homework not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/teacher/homework/:id
// description: Delete homework ID
// @access private

router.delete("/:id", authTeacher, async (req, res) => {
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
