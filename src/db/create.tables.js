const { sequelize } = require('./sequelize.config')

// Models
const { Museo } = require('../models/museo.model')
const { User } = require('../models/user.model')
const { Articulo } = require('../models/articulo.model')
const { Galeria } = require('../models/galeria.model')




sequelize.sync({ force: true })
  .then(() => { console.log('Connected') })
  .catch(err => { console.error(err) })