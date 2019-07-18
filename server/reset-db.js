// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
const userSeedData = require('./seed/users')

// const adapter = new FileSync('./db.json', { defaultValue: { users: [] } })
// const db = low(adapter)

const clear = () => {
  console.log('⚠️ Cleaning Database')
  return db.setState({ users: [] }).write()
}

const seed = () => {
  console.log('⚙️ Seeding Database')
  return db.setState(userSeedData).write()
}

module.exports = { seed, clear }