const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/orders/cart", getCart);
router.post("/orders/cart", addToCart);
router.delete("/orders/cart/:productId", removeFromCart);
router.delete("/orders/cart/clear", clearCart);

module.exports = router;
