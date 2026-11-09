import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb() {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    })
    console.log(`MongoDB connected (${mongoose.connection.name})`)
  } catch (error) {
    console.error('MongoDB connection failed.')
    console.error(
      'Use a local URI like mongodb://127.0.0.1:27017/theo or paste an Atlas mongodb+srv:// string into server/.env as MONGODB_URI. No extra website connector is required — Mongoose is the driver.',
    )
    throw error
  }
}

export async function disconnectDb() {
  await mongoose.disconnect()
}
