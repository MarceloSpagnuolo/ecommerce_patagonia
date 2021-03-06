const server = require("express").Router();
const { Product, Category } = require("../db.js");
const adminAuth = require("../utils/authMiddleware.js")

/////////////////// S17 //////////////////
server.post("/:idProducto/category/:idCategoria", adminAuth, async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    await product.addCategory(category);
    const products = await Product.findAll({
      order: ["id"],
      include: {
        model: Category
      }
    })
    res.json(products);
  } catch (e) {
    res.send(e).status(500);
  }
});

server.delete("/:idProducto/category/:idCategoria", adminAuth, async (req, res) => {
  try {
    const { idProducto, idCategoria } = req.params;

    const product = await Product.findByPk(idProducto);
    !product && res.sendStatus(404);

    const category = await Category.findByPk(idCategoria);
    !category && res.sendStatus(404);

    await product.removeCategory(category);

    const products = await Product.findAll({
      order: ["id"],
      include: {
        model: Category
      }
    })
    res.json(products);
  } catch (e) {
    res.send(e).status(500);
  }
});
////////////////////// S17 ///////////////////

module.exports = server;
