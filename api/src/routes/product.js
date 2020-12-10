const server = require("express").Router();
const { Product, Category } = require("../db.js");

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
      returning: true
    }
  )

  !category && res.send('Esa categoria no existe').status(404);
  res.json(category);
});
////////////////////// S20 //////////////////////



module.exports = server;
