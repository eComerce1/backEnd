const { Model, DataTypes } = require("sequelize");
const Category = require("./Category");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.BIGINT(20),
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        complete_description: { type: DataTypes.TEXT, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        categoryId: {
          type: DataTypes.BIGINT(20),
          allowNull: false,
          references: { model: "categories", key: "id" },
        },
      },
      { sequelize, modelName: "product" }
    );
  }

  static associate(models) {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  }
}

module.exports = Product;
