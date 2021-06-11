const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require("config");
const { check, validationResult } = require('express-validator')
const authStudent = require("../../../../middleware/authStudent");
const Parent = require('../../../../models/student/Parent')


// @Route   Post api/student/parent
// @Desc    Create/Register new parent by @student
// Access   Private

router.post('/', [authStudent, [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),


],
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }

    const { name, email, password } = req.body
    // Bulilding student object
    const parentField = {}
    parentField.student = req.student.id
    if (name) parentField.name = name;
    if (email) parentField.email = email;
    if (password) parentField.password = password;
    try {

        // See if parent exists
        let parent = await Parent.findOne({ email });


        if (parent) {

            res.status(400).json({ errors: [{ msg: 'Parent already exists' }] })
        }

        parent = new Parent(parentField)
        // @@@@@to-do Encrypt password

        const salt = await bcrypt.genSalt(10);
        parent.password = await bcrypt.hash(password, salt);

        //   Save the teacher to the database
        await parent.save();

        // Return jsonwebtoken
        const payload = {
            parent: {
                id: parent.id
            }
        }

        jwt.sign(payload, config.get('jwtParentSecret'), { expiresIn: 36000, }, (err, token) => {
            if (err) throw err
            res.json({ token })

        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever error")
    }
})


// @Route Delete  /api/student/parents/parent
// @Descri         Delete Parent by ID
// @Access         Private

router.delete("/:id", authStudent, async (req, res) => {
    try {
        const deleteParent = await Parent.findById(req.params.id);
        if (!deleteParent) {
            return res.status(404).json({ msg: "Parent not found" });
        }
        await deleteParent.remove();
        res.json({ msg: "Parent removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Parent not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @Route Get     /api/student/parents/parent
// @Descri         Get all Parents by the student ID
// @Access         Private
router.get('/', authStudent, async (req, res) => {

    try {
        const getParents = await Parent.find({ student: req.student.id })

        res.json(getParents)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
