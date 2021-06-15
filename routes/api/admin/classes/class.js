const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Class = require("../../../../models/admin/classes/Class");

// @route POST api/admin/classes/class
// @descri    Creating new class object
// @access public
router.post(
  "/",

  [
    auth,
    [
      check("name", "Class name is required").not().isEmpty(),
     
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, add_students, assign_teachers } = req.body;

    // Bulilding a class object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (add_students) profileFields.add_students = add_students;
    if (assign_teachers) profileFields.assign_teachers = assign_teachers;

    try {
      // see if user exists
      let newClass = await Class.findOne({ name });

      if (newClass) {
        newClass = await Class.findOneAndUpdate(
          { name },
          { $set: profileFields },
          { new: true }
        );
        return res.json(newClass);
      }

      //   create new class object
      newClass = new Class(profileFields);
      // saving the new class to the database
      await newClass.save();
      // return the new class object
      res.json({ profileFields });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @Route Get   api/admin/classes/class
// @Descri         Get all classes @@ for displaying in the dashboard
// @Access         Private
router.get("/", auth, async (req, res) => {
  try {
    const allClass = await Class.find({ user: req.user.id });

    res.json(allClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   /api/admin/teacher
// @Descri      Get  class by Id @@school level
// @Access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const getClassById = await Class.findById(req.params.id).populate("user", [
      "email",
      "name",
    ]);
    if (!getClassById) {
      return res.status(404).json({ msg: "Class not found!" });
    }

    res.json(getClassById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Class not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/admin/classes/class:id
// description: Delete class by ID
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteClass = await Class.findById(req.params.id);
    if (!deleteClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    await deleteClass.remove();
    res.json({ msg: "Class removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
