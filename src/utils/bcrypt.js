const bcrypt = require('bcrypt')

const encodePassword = (password = '') => {
  const encoded = bcrypt.hashSync(password, 10)
  return encoded
}

const decodePassword = (password = '', passwordEncoded = '') => {
  const decoded = bcrypt.compareSync(password, passwordEncoded)
  return decoded
}

module.exports = {
  encodePassword,
  decodePassword
}