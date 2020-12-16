const server = require("express").Router();
const { Order, Order_products } = require("../db.js");



////////////CREACION MANUAL DE CARRITO (para cuando haga click en agregar carrito)////////////////
server.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const {
        total,
        date,
        status,
    } = req.body;
    (!total || !date || !userId) && res.sendStatus(400);
    const order = await Order.create({
        total,
        date,
        status,
        userId
    });
    !order ? res.sendStatus(400) :
        res.json(order).status(201);

})


//////////////////S38//////////////
server.post('/:orderId/order_products/:productsId', async (req, res) => {
    const { orderId, productsId } = req.params;
    const {
        cantidad,
        precio_unitario,
    } = req.body;
    (!orderId || !productsId || !cantidad || !precio_unitario) && res.sendStatus(400);

    const orderProducts = await Order_products.create({
        orderId,
        productsId,
        cantidad,
        precio_unitario
    });
    !orderProducts ? res.sendStatus(400) :
    res.json(orderProducts)
})








module.exports = server;