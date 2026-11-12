import { Schema, model } from 'mongoose'

const connectionCheckSchema = new Schema(
  {
    message: { type: String, required: true },
    source: { type: String, required: true },
    checkedAt: { type: Date, default: Date.now },
  },
  { collection: 'connection_checks' },
)

export const ConnectionCheck = model('ConnectionCheck', connectionCheckSchema)
