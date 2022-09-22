require('dotenv').config()

const env = process.env

module.exports = {
  jwt_secret: env.JWT_SECRET,
  db: env.DB,
  user: env.USER,
  password: env.PASSWORD,
  host: env.HOST
}