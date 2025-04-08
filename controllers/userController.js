const { User, Order, OrderProduct, Product } = require("../models");

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
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ post: updatedUser });
    }
    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).send(error.message);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (parseInt(req.auth.sub) !== parseInt(id)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              through: { attributes: ["amount"] },
            },
          ],
        },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    for (const order of user.orders) {
      await OrderProduct.destroy({ where: { orderId: order.id } });
    }
    await Order.destroy({ where: { userId: id } });
    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  index,
  show,
  update,
  deleteUser,
};
