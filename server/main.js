const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const controllerFactory = require('./controllers')
const { dbClient } = require('./db')

const app = express()
const router = express.Router()
const port  = process.env.PORT || 5000

app.use(middleware.allowCrossOrigin)

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

dbClient().then((db) => {
  const controllers = controllerFactory(db)

  router.post('/login', controllers.login)
  router.post('/signup', controllers.signup)
  router.get('/me', 
    middleware.verifyAuthToken, 
    controllers.getUserInfo
  )
  router.get('/tweets',
    middleware.verifyAuthToken,
    controllers.getTweetsByHashtag
  )

  app.use(router)
  app.listen(port, () => {
    console.log(`✅ Server started on port ${port}`)
  })
})

