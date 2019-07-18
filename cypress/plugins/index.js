const { clearDatabase, seedDatabase } = require('../../server/db')
const userSeed = require('../../server/seed/users')

module.exports = (on, config) => {
  on('task', {
    'clear:db': () => {
      return clearDatabase()
    }
  })

  on('task', {
    'seed:db': (data) => {
      return seedDatabase(data)
    }
  })
}
