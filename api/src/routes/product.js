const server = require("express").Router();
const { Product, Category } = require("../db.js");
const { Op } = require("sequelize");

//////////////////// S21 /////////////////////
server.get("/", (req, res, next) => {
  let { limit, offset, order } = req.query;
  // order tiene que recibier un array con la columna entre comillas dobles
  // /products/?limit=5&offset=5&order=["name"]
  order && (order = JSON.parse(order));
  Product.findAll({ limit, offset, order })
    .then((products) => {
      res.send(products).status(200);
    })
    .catch(next);
});
////////////////////// S21 //////////////////////

///////////////////delete producto/////////////////
server.delete("/removeProduct/:id", async (req, res) => {
  const { id } = req.params;
  const remove = await Product.destroy({
    where: {
      id,
    },
  });
  remove === 0 && res.sendStatus(404);
  res.send("El Producto se eliminó exitosamente");
});

////////////////////// S22 //////////////////////
server.get("/categoria/:nombreCat", async (req, res, next) => {
  const { nombreCat } = req.params;

  const products = await Category.findAll({
    where: {
      name: nombreCat,
    },
    attributes: ["name", "description"],
    include: {
      model: Product,
      attributes: [
        "name",
        "appearance",
        "description",
        "price",
        "stock",
        "volume",
        "thumbnail",
      ],
    },
  });
  res.json(products);
});

////////////////////// S22 //////////////////////

////////////////////// S23 //////////////////////
server.get("/search", async (req, res) => {
  const { query } = req.query;

  const products = await Product.findAll({
    where: {
      [Op.or]: [
        {
          description: { [Op.like]: "%" + query + "%" },
        },
        {
          name: { [Op.like]: "%" + query + "%" },
        },
      ],
    },
  });
  res.json(products);
});
////////////////////// S23 //////////////////////

////////////////////// S24 //////////////////////
server.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
    },
    attributes: [
      "name",
      "appearance",
      "description",
      "price",
      "stock",
      "volume",
      "thumbnail",
    ],
    include: {
      model: Category,
      attributes: ["name", "description"],
    },
  });
  res.json(product);
});
////////////////////// S24 //////////////////////

////////////////////// S25 //////////////////////
server.post("/", async (req, res) => {
  const {
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    thumbnail,
  } = req.body;
  !name && !appearance && !price && !volume && res.sendStatus(400);
  const product = await Product.create({
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    thumbnail,
  });
  res.json(product).status(201);
});
////////////////////// S25 //////////////////////

////////////////////// S26 //////////////////////
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    appearance,
    description,
    price,
    stock,
    volume,
    thumbnail,
  } = req.body;

  var comprobacion =
    typeof name === "string" &&
    typeof appearance === "string" &&
    typeof description === "string" &&
    typeof price === "number" &&
    typeof stock === "number" &&
    (volume === "355 cc" || volume === "473 cc" || volume === "730 cc") &&
    typeof thumbnail === "string";

  !comprobacion && res.sendStatus(400);

  const product = await Product.update(
    {
      name,
      appearance,
      description,
      price,
      stock,
      volume,
      thumbnail,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
  res.json(product);
});
////////////////////// S26 //////////////////////

module.exports = server;
