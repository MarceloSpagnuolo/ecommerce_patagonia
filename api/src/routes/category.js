const server = require("express").Router();
const { Product, Category } = require("../db.js");
const { Op } = require("sequelize");
const adminAuth = require("../utils/authMiddleware.js")

/////////////////GET A CATEGORIAS ///////////////
server.get("/", adminAuth, (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories).status(200);
    })
    .catch(next);
});

///////////////////// S18 ////////////////////
server.post("/", adminAuth, async (req, res) => {
  const { name, description } = req.body;

  const newCategory = await Category.findOrCreate({
    where: {
      name,
    },
    defaults: {
      description
    },

  });
  !newCategory[1] ? res.sendStatus(404) : res.json(newCategory); //status 400 BAD REQUEST

});

//////////////////// S18 ///////////////////

//////////////////// S19 /////////////////////
server.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  const delCategory = await Category.destroy({
    where: {
      id,
    },
  });

  delCategory === 0 ? res.send("Esa categoria NO existe").status(404) : //status 404 NOT FOUND
    res.send("La categoria ha sido eliminada exitosamente").status(200);

});
////////////////////// S19 //////////////////////

//////////////////// S20 /////////////////////
server.put("/:id", adminAuth, async (req, res) => {
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

  !category ? res.send("Esa categoria no existe").status(404) :
    res.json(category);
});
////////////////////// S20 //////////////////////

module.exports = server;
