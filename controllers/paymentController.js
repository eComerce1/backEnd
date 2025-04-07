const { Order } = require("../models");
const mercadopago = require("mercadopago");
const mp = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new mercadopago.Preference(mp);

async function createPreference(req, res) {
  try {
    const { products } = req.body;
    const userId = req.auth.sub;

    const order = await Order.findOne({
      where: {
        userId,
        status: "cart",
      },
    });
    const items = products.map((product) => ({
      title: product.name,
      unit_price: parseFloat(product.price),
      quantity: parseInt(product.amount, 10),
      currency_id: "UYU",
    }));

    const preferenceData = {
      items,
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending",
      },
      auto_return: "approved",
      external_reference: order.id.toString(),
      notification_url: "https://full-cows-feel.loca.lt/api/payment/webhook",
    };

    const response = await preference.create({ body: preferenceData });
    res.json({ init_point: response.sandbox_init_point });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const webhookHandler = async (req, res) => {
  try {
    const payment = req.body;

    if (payment.type === "payment") {
      const { data } = payment;

      // Get full payment info from Mercado Pago API
      const paymentInfo = await mercadopago.payment.findById(data.id);
      const { external_reference, status, payment_method_id } =
        paymentInfo.body;

      if (status === "approved") {
        // Find the order using the external_reference
        const order = await Order.findByPk(external_reference);

        if (order && order.status === "cart") {
          order.status = "pending";
          order.paymentMethod = payment_method_id; // example: 'visa', 'master'
          await order.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in Mercado Pago webhook:", error);
    res.sendStatus(500);
  }
};

module.exports = { createPreference, webhookHandler };
