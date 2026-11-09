import { Router } from 'express'
import mongoose from 'mongoose'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'theo-api',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})
