const { Order, OrderProduct, User, Product } = require("../models");
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
      if (!productId || amount <= 0) continue;

      // Get the product to check available stock
      const product = await Product.findByPk(productId);
      if (!product) continue;

      const availableStock = product.stock;

      // Check if product is already in cart
      const existingItem = await OrderProduct.findOne({
        where: { orderId: cart.id, productId },
      });

      const adjustedAmount = Math.min(amount, availableStock);

      if (existingItem) {
        existingItem.amount = adjustedAmount;
        await existingItem.save();
      } else {
        await OrderProduct.create({
          orderId: cart.id,
          productId,
          amount: adjustedAmount,
        });
      }
    }

    res.status(200).json({ message: "Products added to cart." });
  } catch (err) {
    console.log("Error adding to cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getCart = async (req, res) => {
  const userId = req.auth.sub;

  try {
    const cart = await Order.findOne({
      where: { userId, status: "cart" },
      include: [
        {
          model: Product,
          through: { attributes: ["amount", "orderId", "productId"] },
        },
      ],
    });

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    for (let item of cart.products) {
      const orderProduct = item.OrderProduct;
      if (orderProduct.amount > item.stock || orderProduct.amount > 6) {
        orderProduct.amount = Math.min(item.stock, 6);

        await OrderProduct.update(
          { amount: orderProduct.amount },
          {
            where: {
              orderId: orderProduct.orderId,
              productId: orderProduct.productId,
            },
          }
        );
      }
    }

    // Flatten OrderProduct.amount into each product object
    const updatedProducts = cart.products.map((product) => {
      return {
        ...product.toJSON(),
        amount: product.OrderProduct.amount,
      };
    });

    res.status(200).json({ products: updatedProducts });
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
    console.log("Error removing product from cart:", err);
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
const updateOrderAddress = async (req, res) => {
  try {
    const { address } = req.body;
    console.log(req.auth);
    const userId = req.auth.sub;

    const order = await Order.findOne({ where: { userId, status: "cart" } });

    if (!order) {
      return res.status(404).json({ msg: "No active cart found." });
    }

    order.address = address;
    await order.save();

    res.status(200).json({ msg: "Address updated", orderId: order.id });
  } catch (error) {
    console.log("Error updating address:", error);
    res.status(500).json({ msg: "Failed to update address", error });
  }
};
const getOrdersLastMonth = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [lastMonth, today],
        },
      },
      include: [
        { model: User, attributes: ["email"] },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: { attributes: ["amount"] }, // Trae la cantidad
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = orders.map((order) => ({
      ...order.toJSON(),
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
      }),
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.log("Error fetching last month orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["email"] },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: { attributes: ["amount"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = orders.map((order) => ({
      ...order.toJSON(),
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
      }),
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const id = req.auth.sub;
    const orders = await Order.findAll({
      where: {
        userId: id,
      },
      include: {
        model: Product,
        attributes: ["id", "name", "price"],
        through: { attributes: ["amount"] },
      },
    });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    } else {
      return res.json({ orders });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
  updateOrderAddress,
  getOrdersLastMonth,
  getOrders,
  getUserOrders,
};
