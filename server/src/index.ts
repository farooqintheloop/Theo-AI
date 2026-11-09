import { app } from './app.js'
import { connectDb } from './config/db.js'
import { env } from './config/env.js'

async function start() {
  await connectDb()
  app.listen(env.PORT, () => {
    console.log(`THEO API listening on http://localhost:${env.PORT}`)
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
