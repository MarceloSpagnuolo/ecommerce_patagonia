const db = require("../db.js");
const { Order, User, Product } = db



async function oneOrder(id){
    const order = await Order.findOne({
        where: {
            id: id,
        },
        include: [User, Product],
    });
    return order;
}

module.exports = oneOrder;