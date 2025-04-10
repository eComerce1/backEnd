const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
      },
      { sequelize, modelName: "category" }
    );
  }

  static associate(models) {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
  }
}

module.exports = Category;
