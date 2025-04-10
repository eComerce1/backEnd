const { Product, Category } = require("../models");
const { Op } = require("sequelize");
async function index(req, res) {
  try {
    const products = await Product.findAll();
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function show(req, res) {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ where: { name: name } });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function getProductsByCategory(req, res) {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({
      where: {
        name: {
          [Op.iLike]: categoryName.toLowerCase(),
        },
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const products = await Product.findAll({
      where: { categoryId: category.id },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ msg: "No products found for this category" });
    }

    return res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
  index,
  show,
  getProductsByCategory,
};
