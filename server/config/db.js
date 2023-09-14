const { Router } = require("express")
const mongoose = require("mongoose")

const connectDB = async () => {
    return await mongoose.connect("mongodb://localhost/contact_mern").then(() => console.log(`connection to database established...`)).catch(error => console.log(error))
}

module.exports = connectDB