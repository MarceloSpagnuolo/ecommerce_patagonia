const oneOrder = require("./oneOrder")

async function confirmedOrder({ id }) {
    const Order = await oneOrder(id);
    const data = {
        to: "lu4huf@gmail.com",  //Order.user.email
        total_compra: 2599,
        address: "Laprida 1069, Leones, Córdoba",
        username: "Marcelo Spagnuolo", //`${Order.user.givenname} ${Order.user.familyname}`
        id: id,
        products: 
            Order.products.map((product) => ({
                id: product.id,
                name: product.name,
                thumbnail: product.thumbnail,
                description: product.description,
                Order_products: {
                    quantity: product.Order_products.dataValues.quantity,
                    unitprice: product.Order_products.dataValues.unitprice,
                }
            }))
    }
    console.log(data)
    return data
}

module.exports = confirmedOrder;