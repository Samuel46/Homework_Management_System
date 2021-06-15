const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Subject = require("../../../../models/admin/subjects/Subject");
const authTeacher = require("../../../../middleware/authTeacher");

// @Route  Post/ api/admin/subjects/subject
// @descr   Creating new subject object
// @access  Private

router.post(
  "/",

  [
    auth,
    [
      check("subject_name", "Class name is required").not().isEmpty(),
     
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subject_name, add_classes, assign_teachers } = req.body;

    // Bulilding subject object
    const subjectFields = {};
    subjectFields.user = req.user.id;
    if (subject_name) subjectFields.subject_name = subject_name;
    if (add_classes) subjectFields.add_classes = add_classes;
    if (assign_teachers) subjectFields.assign_teachers = assign_teachers;

    try {
      // see if user exists
      let newSubject = await Subject.findOne({ subject_name });

      if (newSubject) {
        newSubject = await Subject.findOneAndUpdate(
          { subject_name },
          { $set: subjectFields },
          { new: true }
        );
        return res.json(newSubject);
      }
      //   create new class object
      newSubject = new Subject(subjectFields);
      // saving the new class to the database
      await newSubject.save();
      // return the new class object
      res.json({ newSubject });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @Route Get   api/admin/subjects/subject
// @Descri         Get all subjects @@ for displaying in the dashboard
// @Access         Private
router.get("/", auth || authTeacher, async (req, res) => {
  try {
    const allSubject = await Subject.find({ user: req.user.id });

    res.json(allSubject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   /api/admin/subject/subject
// @Descri      Get subject by Id @@school level
// @Access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const getSubjectById = await Subject.findById(req.params.id).populate(
      "user",
      ["email", "name"]
    );
    if (!getSubjectById) {
      return res.status(404).json({ msg: "Subject not found" });
    }

    res.json(getSubjectById);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Subject not available" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/admin/subjects/subject:id
// description: Delete subject by ID
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteSubject = await Subject.findById(req.params.id);
    if (!deleteSubject) {
      return res.status(404).json({ msg: "Subject not found djd" });
    }
    await deleteSubject.remove();
    res.json({ msg: "Subject removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
