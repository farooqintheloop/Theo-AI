import { connectDb, disconnectDb } from '../config/db.js'
import { ConnectionCheck } from '../models/ConnectionCheck.js'

async function main() {
  await connectDb()

  const created = await ConnectionCheck.create({
    message: 'THEO backend connection test',
    source: 'server/src/scripts/check-db.ts',
    checkedAt: new Date(),
  })

  const found = await ConnectionCheck.findById(created._id).lean()

  console.log('Wrote and read test document:')
  console.log(JSON.stringify(found, null, 2))

  await disconnectDb()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
