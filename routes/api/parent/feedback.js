const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const authStudent = require("../../../middleware/authStudent");
const TeacherMsg = require("../../../models/feedback/TeacherMsg");
const StudentMsg = require("../../../models/feedback/StudentMsg");
const authParent = require("../../../middleware/authParent");
const Parent = require("../../../models/student/Parent");



// @Route Get      api/parent/feedback/me/:id
// @Descri         Get student typed message based on the Homework ID @@@ parent level
// @Access         Private
router.get('/me/:id', authParent || authStudent, async (req, res) => {

    try {

        const feedbackById = await StudentMsg.find({ feedbackId: req.params.id }).populate("student", ["name", "username"]);
        if (!feedbackById) {
            return res.status(404).json({ msg: "Feedback not foundsss" });
        }
        res.json(feedbackById)
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Feedback not found" });
        }
        res.status(500).send('Server Error');
    }
})



// @Route Get   api/parent/feedback
// @Descri      Get all feedback from the teachersk@@@ parent Level
// @Access      Private
router.get('/', authParent || authStudent, async (req, res) => {
    try {
        const parent = await Parent.findById(req.parent.id)
        const feedback = await TeacherMsg.find({ student: parent.student }).populate("teacher", ["name", "email"]);

        res.json(feedback)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @Route Get      api/parent/feedback/msg/:id
// @Descri         Get feedback from teacher by ID of the messsage@@ student level
// @Access         Private
router.get('/Msg/:id', authParent || authStudent, async (req, res) => {

    try {

        const feedbackById = await TeacherMsg.find({ feedbackId: req.params.id }).populate("teacher", ["name", "email"]);
        if (!feedbackById) {
            return res.status(404).json({ msg: "Feedback not foundsss" });
        }

        res.json(feedbackById)

    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Feedback not found" });
        }
        res.status(500).send('Server Error');
    }
})



module.exports = router;
