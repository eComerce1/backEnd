const { Product } = require("../models");

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
    const { name } = req.params; // Accede al nombre del producto desde los parámetros de la URL
    const product = await Product.findOne({ name: name });

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
};
