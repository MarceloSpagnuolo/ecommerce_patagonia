
const server = require("express").Router();
const path = require("path");
const multer = require("multer"); //requiero multer
const { create } = require("domain");
const { Image } = require("../db.js");

//multer le asinga un nombre automatico a los archivos sin su extencion ejemplo: ".jpg"
//Con la funcion diskStorage le asignamos el nombre con el que queremos que se guarde
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '../images/cervezas');
        cb(null, path.join(__dirname, "../images/cervezas")); //ruta donde se va a guardar la imagen
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //le asignamos como nombre a los archivos su nombre original "originalname"
    },
});

const upload = multer({ storage });

server.get("/", (req, res, next) => {
    //Get de todos o un producto específico con sus categorías
    let { limit, offset, order, where, include } = req.query; //Destructuring del Query
    // order tiene que recibier un array con la columna entre comillas dobles
    // /products/?limit=5&offset=5&order=["name"]
    // /products/?order=["id"]
    order && (order = JSON.parse(order)); // Parseando a Json el string recibido
    // /products/?where={"id":5}
    where && (where = JSON.parse(where));
    // /products/?where={%22id%22:5}&include=[%22categories%22] El valor de include debe ir en minúscula y plural
    include && (include = JSON.parse(include));

    Image.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
        .then((image) => {
            res.send(image).status(200);
        })
        .catch(next);
});

server.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const image = await Image.destroy({
        where: {
            id,
        },
    });
    return res.sendStatus(200);
});

server.post("/subir", upload.array("image"), (req, res) => {



    res.send("todo oki");
});

server.post("/:id", async (req, res) => {
    const { id } = req.params;
    
    const path = Object.keys(req.body);

    const newPath = `${process.env.URL_BACK}/images/cervezas/` + path

    const images = await Image.create({

        path: newPath,
        productId: id
    });
    !images ? res.sendStatus(400) :
        res.json(images).status(200);
})

module.exports = server;
