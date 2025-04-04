const { Order, OrderProduct } = require("../models");
const { Op } = require("sequelize");

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["cart", "pending", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};
const addToCart = async (req, res) => {
  const userId = req.auth.sub;
  let { products } = req.body; // Expect an array of { productId, amount }

  if (!userId || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid input. Expected an array of products." });
  }

  try {
    // 1. Find or create a cart order for the user
    let [cart] = await Order.findOrCreate({
      where: { userId, status: "cart" },
      defaults: {
        address: "Pending",
        phone: "Pending",
        paymentMethod: "Pending",
      },
    });

    // 2. Iterate over each product in the request
    for (const { productId, amount = 1 } of products) {
      if (!productId || amount <= 0) continue; // Skip invalid entries

      // Check if the product is already in the cart
      const existingItem = await OrderProduct.findOne({
        where: { orderId: cart.id, productId },
      });

      if (existingItem) {
        // If the product exists in the cart, update the quantity
        existingItem.amount += amount;
        await existingItem.save();
      } else {
        // If not, add it to the cart
        await OrderProduct.create({ orderId: cart.id, productId, amount });
      }
    }

    res.status(200).json({ message: "Products added to cart." });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getCart = async (req, res) => {
  const userId = req.auth.sub; // Get the logged-in user

  try {
    // Find the active cart (order with status 'cart') for the user
    const cart = await Order.findOne({
      where: { userId, status: "cart" },
      include: [
        {
          model: Product,
          through: { attributes: ["amount"] }, // Include quantity from OrderProduct
        },
      ],
    });

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.auth.sub;
  const { productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the user's active cart
    const cart = await Order.findOne({
      where: { userId, status: "cart" },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Delete the product from the cart
    const deleted = await OrderProduct.destroy({
      where: {
        orderId: cart.id,
        productId,
      },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  const userId = req.auth.sub;

  try {
    // Find the active cart for the user
    const cart = await Order.findOne({
      where: { userId, status: "cart" },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove all products from the cart
    await OrderProduct.destroy({
      where: { orderId: cart.id },
    });

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
