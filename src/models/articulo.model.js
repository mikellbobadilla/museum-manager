const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize.config");

class Articulo extends Model { }

Articulo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "articulos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { Articulo };