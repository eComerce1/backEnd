const { Order } = require("../models");

// Función para actualizar el estado de la orden
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // El estado que se quiere actualizar

  // Validar si el estado es uno de los valores permitidos
  const validStatuses = ["cart", "pending", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Buscar la orden por ID
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Actualizar el estado de la orden
    order.status = status;
    await order.save(); // Guardar el cambio en la base de datos

    // Responder con la orden actualizada
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

module.exports = {
  updateOrderStatus,
};
