const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const authStudent = require("../../../middleware/authStudent");
const TeacherMsg = require("../../../models/feedback/TeacherMsg");
const { check, validationResult } = require("express-validator");
const StudentMsg = require("../../../models/feedback/StudentMsg");



// @route POST /api/feedback/studentMsg/id
// description: Send feedback to the teacher@@@student level
// @access private
router.post(
    "/:id", [authStudent || authTeacher, [check("text", "Text is required").not().isEmpty()]]
    ,
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const msg = await Complete.findById(req.params.id).populate("student", ["name", "username"]);

            const feedback = new StudentMsg({
                title: msg.title,
                teacher: msg.teacher,
                subject: msg.subject,
                student: req.student.id,
                text: req.body.text,
                feedbackId: msg._id,
            });

            const studentMsg = await feedback.save();

            res.json(studentMsg);
            console.log(studentMsg)


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);


// @Route Get      api/feedback/studentMsg
// @Descri         Get My typed message based on the Homework ID
// @Access         Private
router.get('/me/:id', authStudent || authTeacher, async (req, res) => {

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



// @Route Get   api/feedback/studentMsg
// @Descri      Get all feedback from the teachersk@@@ Student level
// @Access      Private
router.get('/', authStudent || authTeacher, async (req, res) => {
    try {

        const feedback = await TeacherMsg.find({ student: req.student.id }).populate("student", ["name", "username"]);

        res.json(feedback)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @Route Get      api/feedback/studentMsg
// @Descri         Get feedback from teacher by ID of the messsage@@ student level
// @Access         Private
router.get('/Msg/:id', authStudent || authTeacher, async (req, res) => {

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
// @Descri         Get feedback from teacher by ID of the messsage@@ student level
// @Access         Private
router.delete("/:id", authStudent, async (req, res) => {
    try {
        const deletekById = await TeacherMsg.find({ feedbackId: req.params.id }).populate("teacher", ["name", "email"]);
        if (!deletekById) {
            return res.status(404).json({ msg: "Feedback not found" });
        }
        await deletekById.remove();
        res.json({ msg: "Feedback removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @Route Delete   api/feedback/
// @Descri         Delete complete homework by Id @@teacher level
// @Access         Private
router.delete('/complete/:id', authTeacher || authStudent, async (req, res) => {

    try {

        const deleteHomeWorkId = await Complete.findById(req.params.id).populate("student", ["name", "username"]);
        if (!deleteHomeWorkId) {
            return res.status(404).json({ msg: "Homework not found" });
        }

        await deleteHomeWorkId.remove()
        res.json({ msg: "Complete homework removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Homework not found" });
        }
        res.status(500).send('Server Error');
    }
})




module.exports = router;
