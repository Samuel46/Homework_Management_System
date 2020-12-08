const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Class = require('../../../../models/admin/classes/Class');



// @route POST api/admin/classes/class
// @descri    Creating new class object
// @access public
router.post(
    "/",

    [auth, [check("name", "Class name is required").not().isEmpty(),
    check("add_students", "Add students is required").not().isEmpty(),
    check("assign_teachers", "Assign teacher is required").not().isEmpty(),
    ]],
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
        if (add_students) { profileFields.add_students = add_students.split(",").map((add_student) => add_student.trim()) }
        if (assign_teachers) { profileFields.assign_teachers = assign_teachers.split(",").map((assign_teacher) => assign_teacher.trim()) };


        try {


            // see if user exists
            let newClass = await Class.findOne({ name })

            if (newClass) {

                return res
                    .status(400)
                    .json({ errors: [{ msg: "Class already exists" }] });
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

// @route Put api/admin/classes/class
// @descri    updating  class object
// @access public
// router.put(
//     "/",

//     auth,
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, add_student, assign_teacher } = req.body;


//         // Bulilding profile object
//         const updateClass = {}
//         updateClass.user = req.user.id;
//         if (name) updateClass.name = name;
//         if (add_student) updateClass.add_student = add_student;
//         if (assign_teacher) updateClass.assign_teacher = assign_teacher;


//         try {

//             let newClass = Class.find(req.user);

//             if (newClass) {


//                 newClass = await Class.findOneAndUpdate(
//                     { user: req.user.id },
//                     { $set: updateClass }
//                     ,
//                     { new: true }

//                 );
//                 return res.json(newClass);
//             }




//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//     }
// );

// @Route Get   api/admin/classes/class
// @Descri         Get all classes @@ for displaying in the dashboard
// @Access         Private
router.get('/', auth, async (req, res) => {

    try {
        const allClass = await Class.find({ user: req.user.id });



        res.json(allClass)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


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
