const express = require("express");
const router = express.Router();
const Complete = require("../../../models/student/Complete");
const authParent = require("../../../middleware/authParent");
const Parent = require("../../../models/student/Parent");

// @Route Get   api/student/homework
// @Descri         Get all complete homework
// @Access         Private
router.get("/", authParent, async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent.id);

    const completeWork = await Complete.find({
      student: parent.student,
    }).populate("student", ["firstname", "sirname"]);

    res.json(completeWork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route Get   api/parent/complete/:id
// @Descri         Get complete homework by Id @@parent level
// @Access         Private
router.get("/:id", authParent || authStudent, async (req, res) => {
  try {
    const homeWorkId = await Complete.findById(req.params.id).populate(
      "student",
      ["firstname", "sirname"]
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

module.exports = router;
