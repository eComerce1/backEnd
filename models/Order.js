const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT(20),
          primaryKey: true,
          autoIncrement: true,
        },
        address: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        paymentMethod: { type: DataTypes.STRING, allowNull: false },
        status: {
          type: DataTypes.ENUM("cart", "pending", "completed", "cancelled"),
          allowNull: false,
          defaultValue: "cart",
        },
      },
      { sequelize, modelName: "order", timestamps: true }
    );
  }
}

module.exports = Order;
