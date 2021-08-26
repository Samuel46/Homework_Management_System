const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
const auth = require("../../../../middleware/auth");
// import teacher model
const Student = require("../../../../models/admin/students/Student");

// @Route   Post api/admin/student/student
// @Desc    Create/Register new Student by @Admin
// Access   Private

router.post(
  "/",
  [
    auth,
    [
      check("firstname", "FirstName is required").not().isEmpty(),
      check("sirname", "Sirname is required").not().isEmpty(),
      check("username", "Username is required").not().isEmpty(),
      check("gender", "gender is required").not().isEmpty(),
      check("code", "Please add a code").isLength({ min: 4 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      sirname,
      username,
      email,
      birth_date,
      code,
      joining_year_group,
      gender,
      current_year_group,
      // joining_date,
    } = req.body;

    // Bulilding student object

    const studentField = {};
    studentField.user = req.user.id;
    if (firstname) studentField.firstname = firstname;
    if (sirname) studentField.sirname = sirname;
    if (username) studentField.username = username;
    if (email) studentField.email = email;
    if (code) studentField.code = code;
    if (joining_year_group)
      studentField.joining_year_group = joining_year_group;
    if (gender) studentField.gender = gender;
    if (current_year_group)
      studentField.current_year_group = current_year_group;
    // if (joining_date) studentField.joining_date = joining_date;
    if (birth_date) studentField.birth_date = birth_date;

    try {
      // update the students

      let student = await Student.findOne({ email });
      if (student) {
        student = await Student.findOneAndUpdate(
          { email },
          { $set: studentField },
          { new: true }
        );
        return res.json(student);
      }
      student = new Student(studentField);
      //   Save the teacher to the database
      await student.save();

      // Return jsonwebtoken
      const payload = {
        student: {
          id: student.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtStudentSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }
  }
);

// @Route Get  /api/admin/teacher
// @Descri         Get all Students
// @Access         Private
router.get("/", auth, async (req, res) => {
  try {
    const allStudents = await Student.find({ user: req.user.id }).select(
      "-user"
    );

    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get  /api/admin/teacher
// @Descri         Get all Students
// @Access         Private
router.get("/all", auth, async (req, res) => {
  try {
    const allStudents = await Student.find({ user: req.user.id })
      .select("-user")
      .select("-joining_year_group")
      .select("-current_year_group")
      .select("-joining_date")
      .select("-birth_date")
      .select("-_id");

    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   /api/admin/teacher
// @Descri      Get teacher by Id @@school level
// @Access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const getStudentById = await Student.findById(req.params.id).populate(
      "user",
      ["email", "name"]
    );
    if (!getStudentById) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(getStudentById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Student not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/admin/students/student:id
// description: Delete student by ID
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteStudent = await Student.findById(req.params.id);
    if (!deleteStudent) {
      return res.status(404).json({ msg: "Student not found" });
    }

    await deleteStudent.remove();
    res.json({ msg: "Student removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
