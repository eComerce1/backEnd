const { Op } = require("sequelize");
const Order = require("../models/Order");

const getLastMonthOrders = async (req, res) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: lastMonth, // Filtra órdenes creadas desde el último mes
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

module.exports = { getLastMonthOrders };
