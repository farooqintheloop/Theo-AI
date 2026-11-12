import { Router } from 'express'
import { mongoStatus } from '../config/db.js'
import { ConnectionCheck } from '../models/ConnectionCheck.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'theo-api',
    mongo: mongoStatus(),
  })
})

healthRouter.get(
  '/db',
  asyncHandler(async (_req, res) => {
    const latest = await ConnectionCheck.findOne().sort({ checkedAt: -1 }).lean()
    res.json({
      ok: true,
      mongo: mongoStatus(),
      latestCheck: latest,
    })
  }),
)
