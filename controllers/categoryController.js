const { Category } = require("../models");

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Error fetching categories" });
  }
}

module.exports = { getCategories };
