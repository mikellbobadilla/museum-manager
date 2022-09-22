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

module.exports = {
  exitsByUsername,
  getByUsername
}
