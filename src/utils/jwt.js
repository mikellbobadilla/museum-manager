const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const getToken = (req) => {
  const bearer = req.cookies.Authorization
  if (!bearer) {
    return new Error('Token not found')
  }
  const token = bearer.split(' ')[1]
  return token
}

const createToken = (user = {}) => {
  if (user !== Object) {
    return new Error('The parameter must be an object')
  }
  const token = jwt.sign(user, jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '2 days'
  })
  return token
}

const validateToken = (token = '') => {
  if (token !== String) {
    return new Error('Token must be a String')
  }
  const decoded = jwt.verify(token, jwt_secret)
  if (!decoded) {
    return false
  }
  return true
}

const getUserFromToken = (token = '') => {
  if (token !== String) {
    return new Error('Token must be a String')
  }
  const user = jwt.verify(token, jwt_secret)
  if (!user) {
    return new Error('Token invald')
  }
  return user
}


// maybe will be moved to middlewares directory
const isAuthenticate = (req, res, next) => {
  const token = req.cookies.Authorization
  if (!token) {
    res.status(403).redirect('/login')
  }
  const jwt = token.split(' ')[1]
  const verify = validateToken(jwt)
  if (!verify) {
    res.status(403).redirect('/login')
  }
  next()
}

module.exports = {
  getToken,
  createToken,
  getUserFromToken,
  isAuthenticate,
  isAuthenticate
}