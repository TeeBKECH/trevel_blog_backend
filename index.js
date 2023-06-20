import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import errorMiddleware from './middleware/error-middleware.js'

import authRouter from './router/auth-router.js'
import apiRouter from './router/api-router.js'
import userRouter from './router/user-router.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

app.use('/static', express.static(path.resolve(__dirname, 'uploads')))
app.use('/api/', apiRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use(errorMiddleware)

const startApp = () => {
  try {
    mongoose.set('strictQuery', true).connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
