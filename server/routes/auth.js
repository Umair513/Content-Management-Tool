// const router = require("express").Router
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

// router.post("/login");
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    // check all the missing fields

    if (!name || !email || !password) {
        return res.status(400).json({ error: `please enter all required fields name=${name} email=${email} password=${password} ` })
    }
    // name validation

    if (name.length > 25) {
        return res.status(400).json({ error: "name should be less than 25 characters" })
    }

    // email validation
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (emailRegex.test(email)) {
    //     return res.status(400).json({ error: "please enter a valid email address" })
    // }

    // validation of password

    if (password.length <= 6) {
        return res.status(400).json({ error: "please enter password with more than 6 characters" })
    }

    try {

        const doesUserAlreadyExits = await User.findOne({ email })
        if (doesUserAlreadyExits) {
            return res.status(400).json({ error: "a user already has this email address" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashedPassword })

        // save the user 
        const result = await newUser.save()
        result._doc.password = undefined
        return res.status(201).json({ ...result._doc })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "please provide all required fields" })
    }
    try {
        const doesUserExits = await User.findOne({ email })
        if (!doesUserExits) {
            return res.status(400).json({ error: "Invalid email ID or Password" })
        }
        const doesPasswordMatch = await bcrypt.compare(password, doesUserExits.password)
        if (!doesPasswordMatch) {
            return res.status(400).json({ error: "Invalid Email Id Or Password" });
        }

        const payload = { _id: doesUserExits._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({token})
    } catch (error) {

        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router