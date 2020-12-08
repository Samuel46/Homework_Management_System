const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('.././../../middleware/auth');
const { check, validationResult } = require('express-validator')


// import teacher model
const Teacher = require('../../../models/admin/Teacher')



// @Route   Post api/admin/teacher
// @Desc    Create/Register new teacher by @Admin
// Access   Private

router.post('/', [auth, [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('create_class', 'Must be a boolean true or false').isBoolean(),
    check('allocate_classes', 'Please allocate a class').not().isEmpty(),
    check('joining_date', 'Joining data is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }

    const { name, email, password, create_class, allocate_classes, profile_image, joining_date } = req.body

    // Bulilding student object
    const teacherFields = {}
    teacherFields.user = req.user.id
    if (name) teacherFields.name = name;
    if (email) teacherFields.email = email;
    if (password) teacherFields.password = password;
    if (create_class) teacherFields.create_class = create_class;
    if (allocate_classes) { teacherFields.allocate_classes = allocate_classes.split(",").map((allocate_class) => allocate_class.trim()) }
    console.log(teacherFields.allocate_classes)

    if (profile_image) teacherFields.profile_image = profile_image;
    if (joining_date) teacherFields.joining_date = joining_date;

    try {


        // See if user exists
        let teacher = await Teacher.findOne({ email });

        if (teacher) {

            res.status(400).json({ errors: [{ msg: 'Teacher already exists' }] })
        }
        else {
            teacher = new Teacher(teacherFields)
            // @@@@@to-do Encrypt password

            const saltt = await bcrypt.genSalt(10);
            teacher.password = await bcrypt.hash(password, saltt);

            //   Save the teacher to the database
            await teacher.save();

            // Return jsonwebtoken
            const payload = {
                teacher: {
                    id: teacher.id
                }
            }

            jwt.sign(payload, config.get('jwtTeacherSecret'), { expiresIn: 36000, }, (err, token) => {
                if (err) console.log(err, 'samuel testing');
                res.json({ token })
            })


        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever error")
    }
})


// @Route Get  /api/admin/teacher
// @Descri         Get all Teachers
// @Access         Private
router.get('/', auth, async (req, res) => {

    try {
        const allTeachers = await Teacher.find({ user: req.user.id })

        res.json(allTeachers)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @Route Delete  /api/admin/teacher
// @Descri         Delete Teachers by ID
// @Access         Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const deleteTeacher = await Teacher.findById(req.params.id);
        if (!deleteTeacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        await deleteTeacher.remove();
        res.json({ msg: "Teacher removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;




