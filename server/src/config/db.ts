import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb() {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 12000,
    })
    console.log(
      `MongoDB connected (db=${mongoose.connection.name} host=${mongoose.connection.host})`,
    )
  } catch (error) {
    console.error('MongoDB connection failed.')
    console.error(
      'Set MONGODB_URI in server/.env to the Atlas string with the real database username and password (not <db_username> placeholders).',
    )
    throw error
  }
}

export async function disconnectDb() {
  await mongoose.disconnect()
}

export function mongoStatus() {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }
  const readyState = mongoose.connection.readyState
  return {
    state: states[readyState] ?? 'unknown',
    db: mongoose.connection.name || env.MONGODB_DB_NAME,
    host: mongoose.connection.host || null,
  }
}
