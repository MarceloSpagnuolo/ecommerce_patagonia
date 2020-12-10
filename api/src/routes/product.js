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
server.put("/category/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Category.update(
    {
      name,
      description,
    },
    {
      where: {
        id,
      },
    }
  ).then((chang) => {
    !chang && res.send("Esa categoria no existe").status(404);
    res.send("La categoria ha sido modificada").status(200);
  });
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

module.exports = server;
