const { where } = require("sequelize");
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

async function show(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(user);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  index,
  show,
};
