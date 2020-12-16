const server = require("express").Router();
const { User } = require("../db.js");





/////////// S34 ///////////////////
server.post("/", async (req, res) => {
    const {
        name,
        lastname,
        email,
        hashedpassword,
        city,
        adress,
        phone,
        postal,
        role
    } = req.body;
    (!name || !lastName || !email || !hashedpassword || !role) && res.sendStatus(400);
    const user = await User.create({
        name,
        lastname,
        email,
        hashedpassword,
        city,
        adress,
        phone,
        postal,
        role
    });
    !user ? res.sendStatus(400) :
        res.json(user).status(201);
})


////////////// S35 ///////////////////
server.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        name,
        lastname,
        email,
        hashedpassword,
        city,
        adress,
        phone,
        postal,
        role
    } = req.body;

    const user = await User.update(
        {
            name,
            lastname,
            email,
            hashedpassword,
            city,
            adress,
            phone,
            postal,
            role
        },
        {
            where: {
                id,
            },
            returning: true,
        }
    );
    !user ? res.sendStatus(400) : res.json(user)
})

//////////////// 36 /////////////////////////

server.get("/", (req, res, next) => {
    //Get de todos o un producto específico con sus categorías
    let { limit, offset, order, where, include } = req.query; //Destructuring del Query
    // order tiene que recibier un array con la columna entre comillas dobles
    // /products/?limit=5&offset=5&order=["name"]
    // /products/?order=["id"]
    order && (order = JSON.parse(order)); // Parseando a Json el string recibido
    // /products/?where={"id":5}
    where && (where = JSON.parse(where));
    // /products/?where={%22id%22:5}&include=[%22categories%22]
    include && (include = JSON.parse(include));
    User.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
        .then((users) => {
            res.send(users).status(200);
        })
        .catch(next);
});



module.exports = server;