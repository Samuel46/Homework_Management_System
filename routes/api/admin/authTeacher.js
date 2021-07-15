const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require(".././../../middleware/authTeacher");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Import th teacher model
const Teacher = require("../../../models/admin/Teacher");

// @Route Get   api/admin/teacher
// @Descri      Get autheticated teacher using a token
// @Access      Private
router.get("/", auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   Post api/admin/authteacher
// @Desc    Login & get token
// Access   Public

router.post(
  "/",
  [
    check("email", "Email is required Teacher").isEmail(),
    check("password", "Password is required teacher").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // See if user exists
      let teacher = await Teacher.findOne({ email });

      if (!teacher)
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      const isMatch = await (password, teacher.password);

      if (!isMatch)
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      // Return jsonwebtoken
      const payload = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtTeacherSecret"),
        { expiresIn: 36000000 },
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
