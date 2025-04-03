const express = require("express");
const { getProductsByCategory } = require("../controllers/categoryController");

const router = express.Router();

router.get("/:categoryName/products", getProductsByCategory);

module.exports = router;
