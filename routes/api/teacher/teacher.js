const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Subject = require("../../../models/admin/subjects/Subject");
const auth = require("../../../middleware/auth");
const Teacher = require("../../../models/admin/Teacher");
const Class = require("../../../models/admin/classes/Class");
const Student = require("../../../models/admin/students/Student");
// Multer logics
const multer = require("multer");
const Uploads = require("../../../models/teacher/Uploads");

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
  "/upload",
  upload.single("file"),
  [
    authTeacher,
   
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      // complete homewok by the student
      const uploadWork = new Uploads({
        attachements: req.file.path,
        teacher: req.teacher.id,
        filename: req.file.originalname,
        // student: work.student
      }).populate(
        "teacher",
        ["name", "email"]
      );

      const attachements = await uploadWork.save();
      res.json(attachements);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
