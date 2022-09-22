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

const createToken = ({ id, name }) => {
  const token = jwt.sign({ id, name }, jwt_secret, {
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
  const token = req.cookies.authorization
  if (token === undefined) {
    res.redirect('/login')
  }
  const jwt = token.split(' ')[1]
  const verify = validateToken(jwt)
  if (!verify) {
    res.redirect('/login')
  }
  next()
}

module.exports = {
  getToken,
  createToken,
  getUserFromToken,
  isAuthenticate,
  validateToken
}