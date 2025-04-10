const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
async function createAdmin(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      msg: "Administrator created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
    return res.status(500).json({ msg: error.message });
  }
}

async function deleteAdmin(req, res) {
  try {
    const { id } = req.params;

    const admin = await Admin.findByPk(id);

    if (!"admin") {
      return res.status(404).json({ msg: "Admin not found" });
    }

    await admin.destroy();

    return res.status(200).json({ msg: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
console.log("createAdmin function:", typeof createAdmin);

async function index(req, res) {
  try {
    const admins = await Admin.findAll();
    if (admins.length === 0) {
      return res.status(404).json({ msg: "No se encontraron clientes." });
    }
    return res.json({ admins });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Email is already registered." });
    }

    const [updated] = await Admin.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedAdmin = await Admin.findOne({ where: { id: id } });
      return res.status(200).json({ post: updatedAdmin });
    }
    return res.status(404).json({ message: "Admin no encontrado" });
  } catch (error) {
    console.error("Error al actualizar el admin:", error);
    return res.status(500).send(error.message);
  }
}

module.exports = {
  createAdmin,
  deleteAdmin,
  index,
  update,
};
