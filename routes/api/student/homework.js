const express = require("express");
const router = express.Router();
// const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Homework = require("../../../models/teacher/Homework");
const authStudent = require("../../../middleware/authStudent");
const authParent = require("../../../middleware/authParent");
const Student = require("../../../models/admin/students/Student");
const Class = require("../../../models/admin/classes/Class");
const Complete = require("../../../models/student/Complete");
const authTeacher = require("../../../middleware/authTeacher");

// @Route Get   api/student/homework
// @Descri      Get all homework @@ pending homework
// @Access      Private
router.get("/", authStudent || authParent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");

    console.log(student, "samuel is hehehehehhehe");
    const homeWork = await Homework.find({ students: student.name }).populate(
      "teacher",
      ["name", "email"]
    );

    res.json(homeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/student/homework
// description: Edit homework by student
// @access private
// router.post(
//   "/:id",
//   authStudent,
//   check(
//     "completeStudentWork",
//     "Homework Empty👀! Make sure you copy your homework in the Homework editor in the correct format, in order to submityour homework😎"
//   )
//     .not()
//     .isEmpty(),
//   async (req, res) => {
//     const id = req.params.id;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const work = await Homework.findById(id);

//     // complete homewok by the student
//     const {
//       title,
//       teacher,
//       subject,
//       effort_time,
//       allocate_classes,
//       description,
//       students,
//       set_date,
//       due_date,
//       attachements,
//       student,
//       filename,
//       isComplete,
//       completeStudentWork,
//       completeTime,
//     } = req.body;

//     const completeFields = {};
//     completeFields.student = req.student.id;
//     if (title) teacherFields.title = title;
//     if (teacher) teacherFields.teacher = teacher;
//     if (subject) teacherFields.subject = subject;
//     if (effort_time) teacherFields.effort_time = effort_time;
//     if (allocate_classes) teacherFields.allocate_classes = allocate_classes;
//     if (description) teacherFields.description = description;
//     if (students) teacherFields.students = students;
//     if (set_date) teacherFields.set_date = set_date;
//     if (due_date) teacherFields.due_date = due_date;
//     if (attachements) teacherFields.attachements = attachements;
//     if (student) teacherFields.student = student;
//     if (filename) teacherFields.filename = filename;
//     if (isComplete) teacherFields.isComplete = isComplete;
//     if (completeStudentWork)
//       teacherFields.completeStudentWork = completeStudentWork;
//     if (completeTime) teacherFields.completeTime = completeTime;

//     try {
//       // see if user exists
//       let completeWork = await Homework.findById({ id });

//       if (newClass) {
//         newClass = await Class.findOneAndUpdate(
//           { name },
//           { $set: profileFields },
//           { new: true }
//         );
//         return res.json(newClass);
//       }

  
//       newClass = new Complete(profileFields);
     
//       await newClass.save();
      
//       res.json({ profileFields });

//       const homeDone = await completeWork.save();
//       res.json(homeDone);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// @Route Get   api/student/homework/work
// @Descri      Get all classes associate with this student @@ pending homework
// @Access      Private
router.get("/work", authStudent || authParent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    const classrooms = await Class.find({
      add_students: student.name,
    }).populate("user", ["name", "email"]);

    // const allClass = classrooms.map((room) => console.log(room.name));
    // const homeWork = await Homework.find({
    //   allocate_classes: classrooms.map((room) => room.name),
    // });
    res.json(classrooms);
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
