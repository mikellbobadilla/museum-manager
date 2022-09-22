const { Sequelize } = require('sequelize')

const {
  db,
  host,
  password,
  user
} = require('../config/config')

exports.sequelize = new Sequelize(
  db,
  user,
  password, {
  host: host,
  dialect: 'mysql'
})
