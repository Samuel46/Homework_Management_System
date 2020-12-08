const express = require('express');
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Subject = require('../../../../models/admin/subjects/Subject')


// @Route  Post/ api/admin/subjects/subject
// @descr   Creating new subject object
// @access  Private

router.post(
    "/",

    [auth, [check("subject_name", "Class name is required").not().isEmpty(),
    check("add_classes", "Add class is required").not().isEmpty(),
    check("assign_teachers", "Assign teacher is required").not().isEmpty(),
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { subject_name, add_classes, assign_teachers } = req.body;

        // Bulilding subject object
        const subjectFields = {}
        subjectFields.user = req.user.id
        if (subject_name) subjectFields.subject_name = subject_name;
        if (add_classes) { subjectFields.add_classes = add_classes.split(",").map((add_class) => add_class.trim()) }
        if (assign_teachers) { subjectFields.assign_teachers = assign_teachers.split(",").map((assign_teacher) => assign_teacher.trim()) }
        try {
            // see if user exists
            let newSubject = await Subject.findOne({ subject_name })

            if (newSubject) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Subject already exists" }] });
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

// @route Put api/admin/subjects/subject
// @descri    updating  subject object
// @access public
router.put(
    "/",

    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { subject_name, add_class, assign_teacher } = req.body;


        // Bulilding profile object
        const updateSubject = {}

        if (subject_name) updateSubject.subject_name = subject_name;
        if (add_class) updateSubject.add_class = add_class;
        if (assign_teacher) updateSubject.assign_teacher = assign_teacher;


        try {
            // see if Class exists
            let newSubject = Class.findOne({ subject_name });

            if (newSubject) {


                newSubject = await Class.findOneAndUpdate(
                    { subject_name },
                    { $set: updateSubject }
                    ,
                    { new: true }

                );
                return res.json(newSubject);
            }




        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @Route Get   api/admin/subjects/subject
// @Descri         Get all subjects @@ for displaying in the dashboard
// @Access         Private
router.get('/', auth, async (req, res) => {

    try {
        const allSubject = await Subject.find({ user: req.user.id })

        res.json(allSubject)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


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
