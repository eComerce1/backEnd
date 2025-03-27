const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class OrderProduct extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        cantidad: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
        },
      },
      { sequelize, modelName: "orderProduct" }
    );
  }
}

module.exports = OrderProduct;
