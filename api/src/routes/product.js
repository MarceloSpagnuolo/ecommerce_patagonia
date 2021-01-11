const server = require("express").Router();
const { Product, Category } = require("../db.js");
const { Op } = require("sequelize");


// Busca una cadena en el nombre o descripcion del producto \\\\\
///////////////Busqueda con count para hacer la paginación////////////
server.get("/count/:nameCat", async (req, res) => {
  const { nameCat } = req.params;

  if (nameCat === "all") {
    count = await Product.findAndCountAll()
  } else {
    count = await Product.findAndCountAll({
      include: {
        model: Category,
        where: {
          name: nameCat,
        }
      }
    })
  }
  count ? res.send(count).status(200) : res.sendStatus(400);
})

//Preguntar porque el flow de las rutas hace que unas no se ejecuten dependiendo del orden de las mismas.
server.get("/search", async (req, res) => {
  const { query } = req.query;

  const products = await Product.findAll({
    where: {
      [Op.or]: [
        {
          description: { [Op.iLike]: "%" + query + "%" },
        },
        {
          name: { [Op.iLike]: "%" + query + "%" },
        },
      ],
    },
  });
  !products ? res.sendStatus(404) : res.json(products);

});
////////////////////// S23 //////////////////////

//////////////////// S21 /////////////////////
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

  Product.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
    .then((products) => {
      res.send(products).status(200);
    })
    .catch(next);
});
////////////////////// S21 //////////////////////

// Muestra todos los productos de una categoría//////////////////////
server.get("/categoria/", async (req, res) => {
  const { nameCat, limit, offset } = req.query;

  const products = await Product.findAll({
    limit,
    offset,
    include: {
      model: Category,
      where: {
        name: nameCat,
      },
    }
  })

  !products ? res.sendStatus(404) : res.json(products);

});

/////////////////Product ID////////////////////////
server.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findByPk(id);
  producto ? res.json(producto).status(200) : res.send("Ese Id de Producto no existe").status(404);
});
//////////////////////////////////////////////////

///////////////////delete producto/////////////////
server.delete("/removeProduct/:id", async (req, res) => {
  const { id } = req.params;
  const remove = await Product.destroy({
    where: {
      id,
    },
  });
  remove === 0 ? res.sendStatus(404) : res.send("El Producto se eliminó exitosamente");

});


////////////////////// S22 //////////////////////


// Inserta un nuevo Producto ////////////////////
server.post("/", async (req, res) => {
  const {
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    destacado,
    thumbnail,
  } = req.body;
  (!name || !appearance || !price || !volume) && res.sendStatus(400);
  const product = await Product.create({
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    destacado,
    thumbnail,
  });
  !product ? res.sendStatus(400) :
    res.json(product).status(201);
});
////////////////////// S25 //////////////////////

// Modifica un producto específico /////////////
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    destacado,
    thumbnail,
  } = req.body;


  // var comprobacion =
  //   typeof name === "string" &&
  //   typeof appearance === "string" &&      //ERROR parseInt() BUG JAVASCRIPT, COMPROBACION EN FRONT
  //   typeof description === "string" &&     //DEVUELVE NaN PERO typeof LO TOMA COMO "number"
  //   typeof parseInt(price) === "number" &&         //viene como string por body entonces lo parseamos
  //   typeof parseInt(stock) === "number" &&
  //   (volume === "355 cc" || volume === "473 cc" || volume === "730 cc") &&
  //   typeof thumbnail === "string";

  const product = await Product.update(
    {
      name,
      appearance,
      description,
      price,
      stock,
      volume,
      destacado,
      thumbnail,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
  !product ? res.sendStatus(400) : res.json(product);

});
////////////////////// S26 //////////////////////


////////////////////// S27 //////////////////////
server.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.destroy({
    where: {
      id
    },
  }
  );
  //product > 0 && res.sendStatus(200)
  return res.sendStatus(200);
});

////////////////////// S27 //////////////////////

module.exports = server;
