const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize.config");

class ArticuloGaleria extends Model { }

ArticuloGaleria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "articulos",
        key: "id",
      },
    },
    id_galeria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "galerias",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "articulos_galerias",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { ArticuloGaleria };
