const express = require("express");
const router = express.Router();
// const authTeacher = require("../../../middleware/authTeacher");

const Homework = require('../../../models/teacher/Homework');
const authStudent = require("../../../middleware/authStudent");


// @Route Get   api/student/homework
// @Descri         Get all homework
// @Access         Private
router.get('/', authStudent, async (req, res) => {



    try {

        const homeWork = await Homework.find().populate("teacher", ["name", "email"]);


        res.json(homeWork)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// // @Route Get   api/student/homework
// @Descri         Get homework by ID
// @Access         Private
router.get('/:id', authStudent, async (req, res) => {

    try {

        const homeWorkId = await Homework.findById(req.params.id).populate("teacher", ["name", "email"]);
        if (!homeWorkId) {
            return res.status(404).json({ msg: "Homework not found" });
        }

        res.json(homeWorkId)
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Homework not found" });
        }
        res.status(500).send('Server Error');
    }
})

// @route Delete api/teacher/homework/:id
// description: Delete homework ID
// @access private

router.delete("/:id", authStudent, async (req, res) => {
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
