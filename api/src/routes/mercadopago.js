const server = require("express").Router();
const oneOrder = require("../utils/oneOrder")
const confirmedOrder = require("../utils/confirmedOrder")
const { sendEmail } = require("../mailmodel/sendEmail")
// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
});

server.post("/checkout/:id", async (req, res) => {
    const { id } = req.params;
    const Order = await oneOrder(id)
    console.log(Order, "que hay en la order?")
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
            success: `http://localhost:3001/mepa/callback`,
            failure: `http://localhost:3001/mepa/callback`,
        },
        auto_return: "approved",
    };
    const response = await mercadopago.preferences.create(preference);
    res.json({ redirect: response.body.init_point });
});

server.get("/callback", async (req, res) => {
    console.log(req.query, "mercaadiiiiiinn!")
    if (req.query.collection_status !== 'null') {
        const { body } = await mercadopago.payment.get(req.query.collection_id)
        console.log(body,"soy, budy")
        if (req.query.collection_status === "approved") {
            try {
                const OrderTik = await confirmedOrder({ id: req.query.external_reference, total: body.transaction_amount })
                sendEmail(OrderTik)
                res.redirect('http://localhost:3000/order/success');
            } catch (error) {
                res.status(200).json(error)
            }
        } else {
            res.redirect('http://localhost:3000/order/rejected')
        }
    }
})

module.exports = server;