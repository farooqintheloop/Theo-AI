import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/error.js'
import { authRouter } from './routes/auth.js'
import { healthRouter } from './routes/health.js'

export const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(errorHandler)
