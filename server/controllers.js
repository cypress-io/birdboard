const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const { fetchTweetsByHashtags } = require('./twitter')


module.exports = (db) => {
  const userToJson = (user) => {
    return _.pick(user, ['id', 'email'])
  }

  const signup = async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await db.collection('users').findOne({ email })
      console.log(user)

      if (user) {
        return res.status(400).send()
      }

      const newUser = await db.collection('users').insertOne({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 8)
      })

      return res.json({ user: userToJson(newUser) })
    } catch (error) {
      console.log(error)
      return res.status(500).send()
    }
  }


  const login = async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await db.collection('users').findOne({ email })

      if (!user) {
        return res.status(404).send()
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (isValidPassword) {

        return res.json({
          // Sign token with 1 week lifespan
          jwt: jwt.sign(user, 'secret', { expiresIn: 604800 }),
          user: userToJson(user)
        })
      }

      return res.status(401).send()

    } catch (error) {
      console.log(error)
      return res.status(500).send()
    }
  }

  const getUserInfo = (req, res) => {
    const { user, jwt } = req
    return res.json({ user, jwt })
  }

  const getTweetsByHashtag = async (req, res) => {
    const hashtags = req.query['hashtags'].split(',')
    const tweets = await fetchTweetsByHashtags(hashtags)
    return res.json({ tweets })
  }

  return { login, signup, getUserInfo, getTweetsByHashtag }
}
