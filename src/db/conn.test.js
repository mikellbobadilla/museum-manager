const { sequelize } = require('./sequelize.config')

sequelize.authenticate()
  .then(() => console.log('Connection success'))
  .catch(err => console.error('Connection Error:\n', err))