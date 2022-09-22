const { Articulo } = require('../articulo.model')
const { Galeria } = require('../galeria.model')
const { Museo } = require('../museo.model')
const { Articulo } = require('../articulo.model')

// NaN
Articulo.belongsToMany(Galeria, { through: 'articulo_galeria' })
Galeria.belongsToMany(Articulo, { through: 'articulo_galeria' })

// 1aN
Museo.hasMany(Articulo, { as: 'publicaciones', foreignKey: 'id' })
