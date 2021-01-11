const server = require("express").Router();
const { Review, User } = require("../db.js");
const { Op } = require("sequelize");

//////////////// GET REVIEWS /////////////////////////

server.get("/", (req, res, next) => {
  //Get de todos o un producto específico con sus categorías
  let { limit, offset, order, where, include } = req.query; //Destructuring del Query
  // order tiene que recibier un array con la columna entre comillas dobles
  // /products/?limit=5&offset=5&order=["name"]
  // /products/?order=["id"]
  order && (order = JSON.parse(order)); // Parseando a Json el string recibido
  // /products/?where={"id":5}
  where && (where = JSON.parse(where));
  // /products/?where={%22id%22:5}&include=[%22categories%22]
  include && (include = JSON.parse(include));
  Review.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
    .then((review) => {
      res.send(review).status(200);
    })
    .catch(next);
});


/////////////////////////S54//////////////////////////////////

server.post("/:user_id/product/:product_id", async (req, res) => {
  const {
    rate,
    comment,
  } = req.body;

  const { user_id, product_id } = req.params;
  if (rate > 5) return res.send("Rate no puede ser mayor a 5").status(400);
  (!rate || !comment || !user_id || !product_id) && res.send("Falta valor rate, comment, productId o userId").status(400);
  try {
    const review = await Review.create({
      rate,
      comment,
      productId: product_id,
      userId: user_id,
    });

    !review ? res.sendStatus(400) : res.json(review).status(200);
  } catch (error) {
    res.send("Error al crear review").status(400)
  }

});

///////////////////////////////S55//////////////////////////////

server.put(`/:id`, async (req, res) => {
  const { id } = req.params;

  const { rate, comment } = req.body;

  (!rate || !comment || !id) && res.send("Falta valor rate, comment o reviewId").status(400);

  const update = await Review.update(
    {
      rate,
      comment
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
  !update ? res.sendStatus(400) : res.json(update[1][0]);
});


///////////////////////////S56/////////////////////


server.delete("/removeReview/:id", async (req, res) => {
  const { id } = req.params;
  const remove = await Review.destroy({
    where: {
      id,
    },
  });
  remove === 0 ? res.sendStatus(404) : res.send("El Producto se eliminó exitosamente");

});



module.exports = server;