const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require(".././../../middleware/auth");
const { check, validationResult } = require("express-validator");
// import teacher model
const Teacher = require("../../../models/admin/Teacher");

// @Route   Post api/admin/teacher
// @Desc    Create/Register new teacher by @Admin
// Access   Private

router.post(
  "/",
  [
    auth,
    [
      check("firstname", "Firstname is require").not().isEmpty(),
      check("sirname", "Sirname is require").not().isEmpty(),
      check("email", "Email is required").isEmail(),
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
      title,
      email,
      password,
      create_class,
      allocate_classes,
      profile_image,
      joining_date,
    } = req.body;
    // Bulilding student object
    const teacherFields = {};
    teacherFields.user = req.user.id;
    if (firstname) teacherFields.firstname = firstname;
    if (sirname) teacherFields.sirname = sirname;
    if (title) teacherFields.title = title;
    if (email) teacherFields.email = email;
    if (password) teacherFields.password = password;
    if (create_class) teacherFields.create_class = create_class;
    if (allocate_classes) teacherFields.allocate_classes = allocate_classes;
    if (profile_image) teacherFields.profile_image = profile_image;
    if (joining_date) teacherFields.joining_date = joining_date;

    try {
      // See if user exists
      let teacher = await Teacher.findOne({ email });
      // const salt = await bcrypt.genSalt(10);
      // const hashpassword = await bcrypt.hash(req.body.password, salt);
      if (teacher) {
        // update the teacher by the school
        teacher = await Teacher.findOneAndUpdate(
          { email },
          { $set: teacherFields },
          { new: true }
        );
        return res.json(teacher);
      } else {
        // Create the new teacher by the school
        teacher = new Teacher(teacherFields);
        // @@@@@to-do Encrypt password
        // const salt = await bcrypt.genSalt(10);
        // teacher.password = await bcrypt.hash(password, salt);

        //   Save the teacher to the database
        await teacher.save();

        // Return jsonwebtoken
        const payload = {
          teacher: {
            id: teacher.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtTeacherSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) console.log(err, "Server Error");
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }
  }
);

// @Route Get  /api/admin/teacher
// @Descri         Get all Teachers
// @Access         Private
router.get("/", auth, async (req, res) => {
  try {
    const allTeachers = await Teacher.find({ user: req.user.id }).select(
      "-password"
    );

    res.json(allTeachers);
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
    const getTeaherById = await Teacher.findById(req.params.id).populate(
      "user",
      ["email", "name"]
    );
    if (!getTeaherById) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    res.json(getTeaherById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Teacher not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @Route Delete  /api/admin/teacher
// @Descri         Delete Teachers by ID
// @Access         Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteTeacher = await Teacher.findById(req.params.id);
    if (!deleteTeacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }
    await deleteTeacher.remove();
    res.json({ msg: "Teacher removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Teacher not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
