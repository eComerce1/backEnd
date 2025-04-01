const mercadopago = require("mercadopago");

const mp = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new mercadopago.Preference(mp); // 🔹 Se crea una instancia de Preference

async function createPreference(req, res) {
  try {
    const { products } = req.body; // Array de productos con nombre, precio y cantidad

    const items = products.map((product) => ({
      title: product.name,
      unit_price: parseFloat(product.price),
      quantity: product.amount,
      currency_id: "UYU",
    }));

    const preferenceData = {
      items,
      back_urls: {
        success: "https://tu-frontend.com/success", // CAMBIAR
        failure: "https://tu-frontend.com/failure", // CAMBIAR
        pending: "https://tu-frontend.com/pending", // CAMBIAR
      },
      auto_return: "approved",
    };

    const response = await preference.create({ body: preferenceData }); // 🔹 Usar la instancia de Preference

    res.json({ init_point: response.init_point });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { createPreference };
