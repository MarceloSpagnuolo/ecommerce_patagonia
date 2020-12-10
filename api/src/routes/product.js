const server = require("express").Router();
const { Product, Category } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});
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
module.exports = server;
