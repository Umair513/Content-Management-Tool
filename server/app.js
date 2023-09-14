const express = require("express")
const morgan = require("morgan")
const connectDB = require("./config/db")
require("dotenv").config({path: "./config/config.env"})


const app = express()

// middlewares

app.use(express.json())
app.use(morgan("tiny"))

// routes

app.use("/api", require("./routes/auth"))

// server configuration

const PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`server listening on port: ${PORT}`)

    } catch (error) {
        console.log(error)
    }

})