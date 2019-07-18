const mongo = require('mongodb').MongoClient

const dbClient = async () => {
  const client = await mongo.connect('mongodb://localhost:27017')
  return client.db('users')
}

const clearDatabase = async () => {
  const db = await dbClient()
  console.log(db)
  return db.collection('users').drop()
}

const seedDatabase = async (data) => {
  const db = await dbClient()
  return db.collection('users').insertOne(data)
}

module.exports = {
  dbClient,
  clearDatabase,
  seedDatabase
}
