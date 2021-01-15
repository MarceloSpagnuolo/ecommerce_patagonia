const server = require("express").Router();
const { sendEmail } = require("../mailmodel/sendEmail.js");
const { passwordReset } = require("../mailmodel/passwordReset.js");
const { dispatch } = require("../mailmodel/dispatch.js");

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
                description: "Color cobrizo anaranjado levemente opalescente, de espuma consistente",
                Order_products: {
                    quantity: 1,
                    unitprice: 150
                }
            },
            {
                id: 2,
                name: "Amber Lager 433 cm",
                thumbnail: "http://localhost:3001/images/veraipa473.jpg",
                description:"Color marron oscuro espuma color canela persistente y cremosa",
                Order_products: {
                    quantity: 3,
                    unitprice: 130
                }
            },
            {
                id: 8,
                name: "Hoppy Lager 720 cm",
                thumbnail: "http://localhost:3001/images/sendero473.jpg",
                description:"Color dorado profundo aspecto levemente opalescente, espuma blanca persistente",
                Order_products: {
                    quantity: 5,
                    unitprice: 200
                }
            },
        ]
    }

    const data2 = {
        id: 10,
        name: "Pepito Flores",
        to: "lu4huf@gmail.com"
    }


server.get('/vaca', async (req, res) => {
    try {
        sendEmail(data)
        res.send("email, enviado")
    } catch (e) {
        res.status(500)
    }
})

server.get("/toro", async (req, res) => {
    try {
        passwordReset(data2)
        res.send("email, enviado")
    } catch (e) {
        res.status(500)
    }
})

server.get("/perro", async (req,res) => {
    try {
        dispatch(data)
        res.send("email, enviado")
    } catch (e) {
        res.status(500)
    }
})
module.exports = server;