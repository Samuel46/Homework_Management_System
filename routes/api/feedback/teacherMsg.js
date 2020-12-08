const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const authStudent = require("../../../middleware/authStudent");
const TeacherMsg = require("../../../models/feedback/TeacherMsg");
const StudentMsg = require("../../../models/feedback/StudentMsg");
const Complete = require('../../../models/student/Complete');




// @route POST /api/feedback/teacherMsg/id
// description: Send feedback to the student
// @access private
router.post(
    "/:id", [authTeacher || authStudent, [check("text", "Text is required").not().isEmpty()]]
    ,
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            teacher = req.teacher.id


            const msg = await Complete.findById(req.params.id).populate("teacher", ["name", "email"]);

            const feedback = new TeacherMsg({
                title: msg.title,
                subject: msg.subject,
                teacher: req.teacher.id,
                text: req.body.text,
                feedbackId: msg._id,
            });

            console.log(msg._id)
            const teacherMsg = await feedback.save();

            res.json(teacherMsg);
            console.log(teacherMsg)


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);


// @Route Get   api/feedback/teacherMsg
// @Descri         Get all feedback
// @Access         Private
router.get('/', authTeacher || authStudent, async (req, res) => {
    try {

        const feedback = await TeacherMsg.find().populate("teacher", ["name", "email"]);

        res.json(feedback)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// // @Route Get   api/feedback/teacherMsg
// @Descri         Get  sent feedback to student by ID of the messsage@@ teacher level
// @Access         Private
router.get('/:id', authTeacher || authStudent, async (req, res) => {

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

// @Route Get      api/feedback/studentMsg
// @Descri         Get student message based on the Homework ID@@@teacher level
// @Access         Private
router.get('/me/:id', authTeacher || authStudent, async (req, res) => {

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

module.exports = router;
