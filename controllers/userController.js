const { Product, User, OrderProduct } = require("../models");
async function addToCart(req, res) {
  try {
    const userId = req.auth.sub; // Get the logged-in user ID
    const { products } = req.body; // Array of products [{ productId, amount }, ...]

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid products format" });
    }

    // Find or create the user's cart
    let cart = await Order.findOne({
      where: { userId, status: "cart" },
      include: Product,
    });

    if (!cart) {
      cart = await Order.create({ userId, status: "cart" });
    }

    // Add each product to the cart
    for (const { productId, amount } of products) {
      if (!productId || amount <= 0) continue; // Skip invalid data

      await cart.addProduct(productId, {
        through: { amount }, // Use "amount" instead of "quantity"
      });
    }

    // Retrieve the updated cart with products and their amounts
    const updatedCart = await Order.findOne({
      where: { id: cart.id },
      include: [
        {
          model: Product,
          through: { attributes: ["amount"] }, // Include "amount" from OrderProduct
        },
      ],
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ error: "Failed to add products to cart" });
  }
}
