const server = require("express").Router();
const { sendEmail } = require("../mailmodel/sendEmail.js");

    const data = {
        to: "lu4huf@gmail.com",
        total_compra: 2599,
        address: "Laprida 1069, Leones, Córdoba",
        username: "Marcelo Spagnuolo",
        id: 456,
        products: [
            {
                id: 1,
                name: "Amber Lager 720 cm",
                thumbnail: "http://localhost:3001/images/porter730.jpg",
                Order_products: {
                    quantity: 1,
                    unitprice: 150
                }
            },
            {
                id: 2,
                name: "Amber Lager 433 cm",
                thumbnail: "http://localhost:3001/images/veraipa473.jpg",
                Order_products: {
                    quantity: 3,
                    unitprice: 130
                }
            },
            {
                id: 8,
                name: "Hoppy Lager 720 cm",
                thumbnail: "http://localhost:3001/images/sendero473.jpg",
                Order_products: {
                    quantity: 5,
                    unitprice: 200
                }
            },
        ]
    }



server.get('/vaca', async (req, res) => {
    try {
        sendEmail(data)
        res.send("email, enviado")
    } catch (e) {
        console.log(e);
        res.status(500)
    }
})

module.exports = server;