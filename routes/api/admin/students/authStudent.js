const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../../../middleware/authStudent");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Import th teacher model
const Student = require("../../../../models/admin/students/Student");

// @Route Get   api/admin/students/authStudent
// @Descri         Get autheticated Students using a token
// @Access         Private
router.get("/", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   Post api/admin/students/student
// @Desc    Authenticate Students & get token @@save the the token to local storage ## Login Student
// Access   Public

router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("code", "Unique code is required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, username } = req.body;
    try {
      let student = await Student.findOne({ username });
      // See if user exists
      if (!student)
        res.status(400).json({ errors: [{ msg: "username is incorrect" }] });

      const isMatch = await bcrypt.compare(code, student.code);

      if (!isMatch)
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

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

module.exports = router;
