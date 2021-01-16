const server = require("express").Router();
const oneOrder = require("../utils/oneOrder")
const confirmedOrder = require("../utils/confirmedOrder")
const { sendEmail } = require("../mailmodel/sendEmail")
// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_TOKEN
});

server.post("/checkout/:id", async (req, res) => {
    const { id } = req.params;
    const Order = await oneOrder(id)
    let preference = {
        items: Order.products.map((product) => ({
            title: product.name,
            unit_price: product.Order_products.dataValues.unitprice,
            quantity: product.Order_products.dataValues.quantity,
        })), payment_methods: {
            excluded_payment_types: [
                {
                    id: "ticket",
                },
                {
                    id: "atm",
                },
            ],
            installments: 1,
        },
        external_reference: Order.id.toString(),
        back_urls: {
            success: `${process.env.URL_BACK}/mepa/callback`,
            failure: `${process.env.URL_BACK}/mepa/callback`,
        },
        auto_return: "approved",
    };
    const response = await mercadopago.preferences.create(preference);
    res.json({ redirect: response.body.init_point });
});

server.get("/callback", async (req, res) => {
    
    if (req.query.collection_status !== 'null') {
        const { body } = await mercadopago.payment.get(req.query.collection_id)
        if (req.query.collection_status === "approved") {
            try {
                const Order = await oneOrder(req.query.external_reference);
                const update = await Order.update(
                    {
                        status: "procesando"
                    },
                    {
                        where: {
                            id: req.query.external_reference,
                        },
                        returning: true,
                    }
                );
                sendEmail(update.toJSON());
                res.redirect(`http://localhost:3000/order/success`);
            } catch (error) {
                res.status(400).json(error)
            }
        } else {
            res.redirect(`http://localhost:3000/order/rejected`)
        }
    }
})

module.exports = server;