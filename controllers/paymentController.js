const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Usa una variable de entorno para seguridad
});

async function createPreference(req, res) {
  try {
    const { products } = req.body; // Array de productos con nombre, precio y cantidad

    const items = products.map((product) => ({
      title: product.name,
      unit_price: parseFloat(product.price),
      quantity: product.amount,
      currency_id: "UYU",
    }));

    const preference = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: "https://tu-frontend.com/success", //CAMBIAR
        failure: "https://tu-frontend.com/failure", //CAMBIAR
        pending: "https://tu-frontend.com/pending", //CAMBIAR
      },
      auto_return: "approved",
    });

    res.json({ init_point: preference.body.init_point });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { createPreference };
