const server = require("express").Router();
const { Product, Category } = require("../db.js");

/////////////////// S17 //////////////////
server.post("/:idProducto/category/:idCategoria", async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    await product.addCategory(category);
    res.send(product).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

server.delete("/:idProducto/category/:idCategoria", async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    await product.removeCategory(category);
    // const productJoinCategory = await Product.findOne(id,
    //   {
    //   include: {
    //     Category,
    //   }
    // });
    res.sendStatus(200);
  } catch (e) {
    res.send(e).status(500);
  }
});
////////////////////// S17 ///////////////////

module.exports = server;
