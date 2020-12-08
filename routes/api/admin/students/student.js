const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator')
const auth = require("../../../../middleware/auth");
// import teacher model
const Student = require('../../../../models/admin/students/Student')


// @Route   Post api/admin/student/student
// @Desc    Create/Register new Student by @Admin
// Access   Private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('gender', 'gender is required').not().isEmpty(),
    check('birth_date', 'Birth date data is required').not().isEmpty(),
    check('code', 'Unique code is required').isLength({ min: 4 }),
    check('joining_year_group', 'Joing year group is required').not().isEmpty(),
    check('current_year_group', 'Current year group is required').not().isEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }

    const { name, username, email, birth_date, code, joining_year_group, gender, current_year_group, joining_date } = req.body

    // Bulilding student object

    const studentField = {}
    studentField.user = req.user.id
    if (name) studentField.name = name;
    if (username) studentField.username = username;
    if (email) studentField.email = email;
    if (code) studentField.code = code;
    if (joining_year_group) studentField.joining_year_group = joining_year_group;
    if (gender) studentField.gender = gender;
    if (current_year_group) studentField.current_year_group = current_year_group;
    if (joining_date) studentField.joining_date = joining_date;
    if (birth_date) studentField.birth_date = birth_date;


    try {


        // See if user exists
        let student = await Student.findOne({ email });


        if (student) {

            res.status(400).json({ errors: [{ msg: 'Student already exists' }] })
        }


        student = new Student(studentField)
        // @@@@@to-do Encrypt password

        const salt = await bcrypt.genSalt(10);
        student.code = await bcrypt.hash(code, salt);

        //   Save the teacher to the database
        await student.save();

        // Return jsonwebtoken
        const payload = {
            student: {
                id: student.id
            }


        }

        jwt.sign(payload, config.get('jwtStudentSecret'), { expiresIn: 36000, }, (err, token) => {
            if (err) throw err
            res.json({ token })

        })




    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever error")
    }
})



// @route Put api/admin/student/student
// @descri    updating  student object
// @access public
// router.put(
//     "/",

//     auth,
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, email, birth_date, code, joining_year_group, gender, current_year_group, joining_date } = req.body


//         // Bulilding student object
//         const updateStudent = {}

//         if (name) updateStudent.name = name;
//         if (email) updateStudent.email = email;
//         if (code) updateStudent.code = code;
//         if (joining_year_group) updateStudent.joining_year_group = joining_year_group;
//         if (gender) updateStudent.gender = gender;
//         if (current_year_group) updateStudent.current_year_group = current_year_group;
//         if (joining_date) updateStudent.joining_date = joining_date;
//         if (birth_date) updateStudent.birth_date = birth_date;


//         try {
//             // see if Class exists
//             let newStudent = Class.findOne({ email });

//             if (newStudent) {


//                 newStudent = await Student.findOneAndUpdate(
//                     { email },
//                     { $set: updateStudent }
//                     ,
//                     { new: true }

//                 );
//                 return res.json(newStudent);
//             }




//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//     }
// );

// @Route Get  /api/admin/teacher
// @Descri         Get all Students
// @Access         Private
router.get('/', auth, async (req, res) => {

    try {
        const allStudents = await Student.find({ user: req.user.id })

        res.json(allStudents)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route Delete api/admin/students/student:id
// description: Delete student by ID
// @access private


router.delete("/:id", auth, async (req, res) => {
    try {
        const deleteStudent = await Student.findById(req.params.id);
        if (!deleteStudent) {
            return res.status(404).json({ msg: "Student not found" });
        }


        await deleteStudent.remove();
        res.json({ msg: "Student removed" });
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});





module.exports = router;




