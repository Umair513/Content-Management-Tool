const express = require('express');
const { validateContact } = require('../models/Contact');
const router = express.Router();

router.post("/contact", async (req, res) => {
    const { error } = validateContact(req.body)
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    try {

    } catch (error) {
        console.log(error)
    }
})

module.exports = router