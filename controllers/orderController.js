const Order = require("../models/Order");
const { Op } = require("sequelize");

const getCart = async (req, res) => {};

const addToCart = async (req, res) => {};

const removeFromCart = async (req, res) => {};

const clearCart = async (req, res) => {};

const updateOrderStatus = async (req, res) => {};

const getLastMonthOrders = async (req, res) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setHours(0, 0, 0, 0);

    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: lastMonth,
        },
      },
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = orders.map((order) => ({
      ...order.toJSON(),
      formattedDate: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
      }).format(new Date(order.createdAt)),
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
  getLastMonthOrders,
};
