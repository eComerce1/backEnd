const { Product, Category } = require("../models");
const { Op } = require("sequelize");
async function index(req, res) {
  try {
    const { category } = req.query;

    if (category) {
      const categoryInstance = await Category.findOne({
        where: {
          name: {
            [Op.iLike]: category.toLowerCase(),
          },
        },
      });

      if (!categoryInstance) {
        return res.status(404).json({ msg: "Category not found" });
      }

      const products = await Product.findAll({
        where: { categoryId: categoryInstance.id },
      });

      return res.json({ products });
    }

    const products = await Product.findAll();
    return res.json({ products });
  } catch (error) {
    console.log("Error fetching products:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
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

module.exports = {
  index,
  show,
};
