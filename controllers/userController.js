const { User } = require("../models");
//const bcrypt = require("bcryptjs");

async function index(req, res) {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).json({ msg: "No se encontraron usuarios." });
    }
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  index,
};
