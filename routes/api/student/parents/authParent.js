const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const authStudent = require("../../../../middleware/authStudent");
const authParent = require("../../../../middleware/authParent");
// const authStudent = require("../../../../middleware/authStudent");
const Parent = require('../../../../models/student/Parent')



// @Route Get   api/admin/students/authStudent
// @Descri       Get autheticated Students using a token by student ID
// @Access         Private
router.get('/', authParent, async (req, res) => {
    try {
        const parent = await Parent.findById(req.parent.id).populate("student", ["name", "username"]);

        res.json(parent)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @Route   Post api/admin/students/parent
// @Desc    Authenticate Parents & get token 
//-- @@save the the token to local storage ## Login Parents
// Access   Private

router.post('/', [
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { password, email } = req.body
    try {
        let parent = await Parent.findOne({ email })
        // See if user exists 
        if (!parent) (
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        )

        const isMatch = await bcrypt.compare(password, parent.password);

        if (!isMatch) (
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

        )
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

module.exports = router;