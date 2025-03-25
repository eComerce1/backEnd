const Product = require("../models/Product");

async function index(req, res) {
  try {
    const products = await Product.find();
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  index,
};
