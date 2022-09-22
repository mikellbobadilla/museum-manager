const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize.config')

class Galeria extends Model { }

Galeria.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    ruta: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'galerias',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = { Galeria }