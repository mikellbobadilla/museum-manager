const { password } = require('../config/config')
const { User } = require('../models/user.model')

const exitsByUsername = async (username = '') => {
  const user = await User.findOne({
    where: {
      username: username
    }
  })
  if (!user) {
    return false
  }
  return true
}

const getByUsername = async (username) => {
  const user = await User.findOne({
    where: {
      username: username
    }
  })
  if (!user) {
    return null
  }
  return user
}


const saveUser = async (username, password) => {
  return await User.create({
    username: username,
    password: password
  })
}

module.exports = {
  exitsByUsername,
  getByUsername,
  saveUser
}
