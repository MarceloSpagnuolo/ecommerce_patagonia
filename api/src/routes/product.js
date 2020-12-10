const server = require("express").Router();
const { Product, Category } = require("../db.js");
const { Op } = require("sequelize");

//////////////////// S21 /////////////////////
server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products).status(200);
    })
    .catch(next);
});
////////////////////// S21 //////////////////////

/////////////////// S17 //////////////////
server.post("/:idProducto/category/:idCategoria", async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    product.addCategory(category);
    res.send(product).status(200);
  } catch {
    res.sendStatus(500);
  }
});

server.delete("/:idProducto/category/:idCategoria", async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    product.removeCategory(category);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});
////////////////////// S17 ///////////////////

///////////////////// S18 ////////////////////
server.post("/category", async (req, res) => {
  const { name, desctiption } = req.body;

  const newCategory = await Category.findOrCreate({
    where: {
      name,
    },
    defaults: {
      desctiption,
    },
  });

  newCategory && res.send("Esa categoria ya existe").status(400); //status 400 BAD REQUEST

  res.sendStatus(200);
});

//////////////////// S18 ///////////////////

//////////////////// S19 /////////////////////
server.delete("/category/:id", async (req, res) => {
  const { id } = req.params;

  const delCategory = await Category.destroy({
    where: {
      id,
    },
  });

  delCategory === 0 && res.send("Esa categoria NO existe").status(404); //status 404 NOT FOUND

  res.send("La categoria ha sido eliminada exitosamente").status(200);
});
////////////////////// S19 //////////////////////

//////////////////// S20 /////////////////////
server.put("/category/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.update(
    {
      name,
      description,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  !category && res.send("Esa categoria no existe").status(404);
  res.json(category);
});
////////////////////// S20 //////////////////////

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

module.exports = server;
