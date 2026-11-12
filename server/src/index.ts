import { app } from './app.js'
import { connectDb } from './config/db.js'
import { env } from './config/env.js'

async function start() {
  await connectDb()
  app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`THEO API listening on port ${env.PORT}`)
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
