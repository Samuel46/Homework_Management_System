const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const User = require("../../models/User");

// @route POST api/user
// Register Users
// @access public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include  a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6  or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Build a school object
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) userFields.password = password;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        user = await User.findOneAndUpdate(
          { email: email },
          { $set: userFields },
          { new: true }
        );
        return res.json(user);
      }

      user = new User(userFields);
      // encrpt the password
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return  Jsonwentoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @Route Get   /api/admin/teacher
// @Descri      Get teacher by Id @@school level
// @Access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const getUserById = await Teacher.findById(req.params.id).populate("user", [
      "email",
      "name",
    ]);
    if (!getUserById) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    res.json(getUserById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Teacher not available" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
