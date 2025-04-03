const express = require("express");
const {
  index,
  show,
  getProductsByCategory,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", index);
router.get("/:name", show);
router.get("/category/:categoryName", getProductsByCategory);

module.exports = router;
