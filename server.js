import express from 'express'
import mongoose from 'mongoose'
import userRouter from './Router/userRouter.js'
import authRouter from './Router/authRouter.js'
import dotenv from 'dotenv'
dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const app = express()

app.use(express.json())
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