const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Homework = require('../../../models/teacher/Homework');
const authStudent = require("../../../middleware/authStudent");
const Complete = require("../../../models/student/Complete");


// @route POST api/teacher/homework
// @descri    Creating new homework
// @access public
router.post(
    "/",

    [authTeacher || authStudent, [check("title", "Title is required").not().isEmpty(),
    check("subject", "Subject is required").not().isEmpty(),

    check("effort_time", "Effort time is required").not().isEmpty(),

    check("allocate_classes", "Please allocate a class").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),

    check("set_date", "Set date is required").not().isEmpty(),
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            subject,

            effort_time,
            allocate_classes,
            description,
            students,
            set_date,
            due_date,
            attachements } = req.body;

        // Bulilding homework object
        const homeworkFields = {}
        homeworkFields.teacher = req.teacher.id
        if (title) homeworkFields.title = title;
        if (subject) homeworkFields.subject = subject;
        if (effort_time) homeworkFields.effort_time = effort_time;
        if (set_date) homeworkFields.set_date = set_date;
        if (due_date) homeworkFields.due_date = due_date;
        if (description) homeworkFields.description = description;
        if (allocate_classes) { homeworkFields.allocate_classes = allocate_classes.split(",").map((allocate_class) => allocate_class.trim()) }
        if (students) { homeworkFields.students = students.split(",").map((student) => student.trim()) }
        if (attachements) { homeworkFields.attachements = attachements.split(",").map((attachement) => attachement.trim()) }

        try {
            // see if homework exists
            let homework = await Homework.findOne({ title })

            if (homework) {

                return res
                    .status(400)
                    .json({ errors: [{ msg: "Homework already exists" }] });
            }

            //   create new homework abject
            homework = new Homework(homeworkFields);

            //Save homework to database
            await homework.save();
            // return homewoek
            res.json({ homework });


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @Route Get   api/teacher/homework
// @Descri         Get all homework
// @Access         Private
router.get('/', authTeacher, async (req, res) => {

    try {
        const homeWork = await Homework.find({ teacher: req.teacher.id }).populate("teacher", ["name", "email"]);

        res.json(homeWork)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route Delete api/teacher/homework/:id
// description: Delete homework ID
// @access private

router.delete("/:id", authTeacher, async (req, res) => {
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


// @Route Get      api/teacher/homework
// @Descri         Get all complete homework from the student @@@ teacher level
// @Access         Private
router.get('/complete', authTeacher || authStudent, async (req, res) => {

    try {


        const homeWork = await Complete.find({ teacher: req.teacher.id }).populate("student", ["name", "username"]);


        res.json(homeWork)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
// @Route Get   api/teacher/homework/complete
// @Descri         Get complete homework by Id @@teacher level
// @Access         Private
router.get('/complete/:id', authTeacher || authStudent, async (req, res) => {

    try {

        const homeWorkId = await Complete.findById(req.params.id).populate("teacher", ["name", "email"]);
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


module.exports = router;
