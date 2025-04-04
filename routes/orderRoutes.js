const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/orders/cart", getCart);
router.post("/orders/cart", addToCart);
router.delete("/orders/cart/:productId", removeFromCart);
router.delete("/orders/cart/clear", clearCart);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
