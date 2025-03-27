const { Model, DataTypes } = require("sequelize");

class OrderProduct extends Model {
  static initModel(sequelize) {
    OrderProduct.init(
      {
        cantidad: {
          type: DataTypes.BIGINT(20),
          allowNull: false,
          defaultValue: 1,
        },
      },
      { sequelize, modelName: "orderProduct" }
    );
  }
}

module.exports = OrderProduct;
