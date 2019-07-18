const jwt  = require('jsonwebtoken')

const allowCrossOrigin = ((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  
  next()
})

const verifyAuthToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  try {
    req.jwt = token
    req.user = jwt.verify(token, 'secret')
    next()
  } catch (error) {
    console.log(error)
    return res.status(401)
  }
}

module.exports = {
  allowCrossOrigin,
  verifyAuthToken
}