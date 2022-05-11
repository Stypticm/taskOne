const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const authRouter = require('./Router/authRouter')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', userRouter, authRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Listen port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startApp()