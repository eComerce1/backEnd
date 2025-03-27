const { Model, DataTypes } = require("sequelize");

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
      },
      { sequelize, modelName: "product" }
    );
  }
}

module.exports = Product;
