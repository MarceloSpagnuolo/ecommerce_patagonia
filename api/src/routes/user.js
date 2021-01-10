const server = require("express").Router();
const { User, Product, Order, Order_products } = require("../db.js");
const { Op } = require("sequelize");

/////////// S34 ///////////////////
//Creación de usuario. City, adress, phone y postal no son obligatorios.
//Si ingresa un mail repetido, manda un status 400 con un mensaje de email repetido.
server.post("/", async (req, res) => {
  console.log(req.body,"Del back")
  const {
    givenname,
    familyname,
    email,
    password,
    googleID,
    photoURL,
    city,
    adress,
    phone,
    postal,
    role,
  } = req.body;

  (!givenname || !familyname || !role) && res.send("Falta valor givenname, familyname o role").status(400);

  try {
    const user = await User.create({
      givenname,
      familyname,
      email,
      password,
      googleID,
      photoURL,
      city,
      adress,
      phone,
      postal,
      role,
    });
    !user ? res.sendStatus(400) : res.json(user).status(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

////////////// S35 ///////////////////
//Puede devolver undefined si no existe ningún usuario con ese id.
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    givenname,
    familyname,
    email,
    password,
    city,
    adress,
    phone,
    postal,
  } = req.body;

  const user = await User.update(
    {
      givenname,
      familyname,
      email,
      password,
      city,
      adress,
      phone,
      postal,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
    );
    
    !user ? res.sendStatus(400) : res.json(user[1][0]);
  });

  
  server.get("/:userId/cart", async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
            },
          ],
          where: {
            [Op.or]: [
              {
                status: "carrito",
              },
            ],
          },
        },
      ],
    });
    !user ? res.sendStatus(404) : res.json(user);
  });


server.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const usuario = await User.findByPk(userId)
  usuario ? res.json(usuario).status(200) : res.sendStatus(400);
})
//////////////// 36 /////////////////////////

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
  if (req.user) {
    User.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
      .then((users) => {
        res.send(users).status(200);
      })
      .catch(next);
  } else {
    res.sendStatus(401);
  }

});

/////////////////// S38 /////////////////////////////
// MUCHO OJO. SI MANDAN 2 VECES EL MISMO PRODUCTO CON DIFERENTE VALORES
//COMO PUEDE SER QUANTITY LA SEGUNDA LO UPDATEA Y EL JSON DEVUELVE UN 1!
server.post("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, unitprice } = req.body;
  (!userId || !productId || !quantity || !unitprice) &&
    res.send("Falta valor userId, productId, quantity o unitprice").status(400);

  const user = await User.findByPk(userId, { include: Order });
  const orderId = user.orders[0].dataValues.id; // saco el id del order.

  const order = await Order.findByPk(orderId);
  const product = await Product.findByPk(productId);
  const orderProduct = await order.addProduct(product, {
    through: { quantity, unitprice },
  }); //Agrega el producto

  !orderProduct ? res.sendStatus(400) : res.json(orderProduct);
});

//////////////METODO ANTERIOR/////////////
//   const order = await Order.findByPk(orderId);
//   console.log(order, "esto es null??");
//   const product = await Product.findByPk(productId);
//   console.log(product);

//   await order.addProduct(product, { through: { quantity, unitprice } });
//   const pepito = await Order.findAll({
//     include: {
//       model: Product,
//     },
//   });
//   console.log(pepito, "pepito prueba");
//   !pepito ? res.sendStatus(404) : res.json(pepito);
// });

//////////////////// S39 //////////////////////////

// Por ahora devuelve todos los items de todas las Order que tienen status "carrito".
// La tarea dice que debe devolver el ULTIMO Order abierto (sea lo que signifique eso). Se puede discutir a ver que
// es lo que se interpreta por "el último Order abierto" para ver que cosa más específica queremos devolver.

/////////// Solo los productos /////////////
/* 
   Hay otro modelo que trae unicamente los productos en el res.data,
   por espacio no se agrega abajo pero esta guardado por si surge
   la necesidad.
   Se recomienda optar en la practica por el que resulte mas conveniente.
*/

///////////////// S40 ///////////////////
// Es un delete normal. El res.Json devuelve el item
// que es igual a 1, no influye porque la accion se efectua
// pero puede devolver un message de confirmación de delete si se desea
server.delete("/:orderId/cart/:productId", async (req, res) => {
  const { orderId, productId } = req.params;

  const itemDelete = await Order_products.destroy({
    //Se preguntaran porque usamos la tabla de relacion directamente
    where: {
      // No les voy a mentir....
      orderId,
      productId,
    },
  });
  !itemDelete ? res.sendStatus(404) : res.json(itemDelete);
});

///////////////////////// S41 /////////////////////
// En la logica se considera que solo se puede modificar una orden
// solo cuando se encuentra en estado "carrito", por eso solo se trabajan en estas
// recibe solo "producto" y "quantity" del body ya que son las unicas modificables por el "USER"
server.put("/:userId/product/cart", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const product = await Product.findByPk(productId);

  const order = await Order.findOne({
    // nos traemos solo la orden con status "carrito"
    where: {
      // y que coincida con idUser
      userId, // al considerarse que un user solo puede tener una "order"
      [Op.or]: [
        // en status "carrito", se utiliza el metodo "findOne"
        {
          status: "carrito",
        },
      ],
    },
  });
  await order.setProducts(product, { through: { quantity } }); // aca se updatea los datos

  const orderUpdate = await Order_products.findAll(
    // se crea una const para devolverlo en el json
    {
      where: {
        orderId: order.id,
        productId,
      },
    }
  );
  !orderUpdate ? res.sendStatus(404) : res.json(orderUpdate);
});

//////////////////////////////////S70////////////////////////////////

server.post("/:id/passwordReset", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const passwordReset = await User.update(
    {
      password,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  !passwordReset ? res.sendStatus(400) : res.json(passwordReset);
});

/////////////// Fin de rutas en Users ///////////////

module.exports = server;
