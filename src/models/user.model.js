const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize.config");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { User };
