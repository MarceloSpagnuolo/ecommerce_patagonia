const server = require("express").Router();
const { User, Product, Order, Order_products } = require("../db.js");
const { Op } = require("sequelize");

/////////// S34 ///////////////////
//Creación de usuario. City, adress, phone y postal no son obligatorios.
//Si ingresa un mail repetido, manda un status 400 con un mensaje de email repetido.
server.post("/", async (req, res) => {
  const {
    name,
    lastname,
    email,
    hashedpassword,
    city,
    adress,
    phone,
    postal,
    role,
  } = req.body;
  (!name || !lastname || !email || !hashedpassword || !role) && res.send("Falta valor name, lastname, email, pass o role").status(400);
  try {
    const user = await User.create({
      name,
      lastname,
      email,
      hashedpassword,
      city,
      adress,
      phone,
      postal,
      role,
    });
    !user ? res.sendStatus(400) : res.json(user).status(201);
  } catch (error) {
    res.send("Ese email ya existe").status(400)   
  }
  
});

////////////// S35 ///////////////////
//Puede devolver undefined si no existe ningún usuario con ese id.
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastname,
    email,
    hashedpassword,
    city,
    adress,
    phone,
    postal,
    role,
  } = req.body;

  const user = await User.update(
    {
      name,
      lastname,
      email,
      hashedpassword,
      city,
      adress,
      phone,
      postal,
      role,
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
  User.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
    .then((users) => {
      res.send(users).status(200);
    })
    .catch(next);
});

/////////////////// S38 /////////////////////////////
// MUCHO OJO. SI MANDAN 2 VECES EL MISMO PRODUCTO CON DIFERENTE VALORES
//COMO PUEDE SER QUANTITY LA SEGUNDA LO UPDATEA Y EL JSON DEVUELVE UN 1!
server.post("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  //orderId
  const { productId, quantity, unitprice } = req.body;
  (!userId || !productId || !quantity || !unitprice) && res.send("Falta valor userId, productId, quantity o unitprice").status(400);

  const user = await User.findByPk(userId, {include: Order});
const orderId = user.orders[0].dataValues.id // saco el id del order.

const order = await Order.findByPk(orderId)
const product = await Product.findByPk(productId)
const orderProduct = await order.setProduct(product, { through: { quantity, unitprice } }) //Agrega el producto


!orderProduct ? res.sendStatus(400) : res.json(orderProduct);
})

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

server.get("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
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

  // const orders = await user.getOrders({
  //     where: {
  //         [Op.or]: [
  //             {
  //                 status: "carrito",
  //             }, {
  //                 status: "creada",
  //             },
  //         ],
  //     }
  // })

  // let arr = []
  // for( let o of orders) {
  //     const pepito = await o.getProducts()
  //     arr.push(pepito)
  // }

  // console.log(user)
  res.json(user);
});

/////////////////S40///////////////

server.get('/:userId/product/cart', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: {
      model: Order,
      where: {
        [Op.or]: [
          {
            status: "carrito",
          }, {
            status: "creada",
          },
        ],
      }
    }
  })
  const orders = await user.getOrders({
    where: {
      [Op.or]: [
        {
          status: "carrito",
        }, {
          status: "creada",
        },
      ],
    }
  })
  let arr = []
  for (let o of orders) {
    const pepito = await o.getProducts()
    console.log(pepito, "miau")
    arr.push(pepito)
  }
  res.json(arr)
})

/////////////////////////S41///////////////////

server.put("/:userId/cart/otracosa", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  const user = await User.findAll(
    {
      where: {
        id: userId,
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              where: {
                id: productId,
              },
            },
          ],
          where: {
            status: "carrito",
          },
        },
      ],
    },
  );


 

  ///////////////////////////
 
  console.log(resultado);
  res.json(user);
});

server.put('/:userId/product/cart', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const product = await Product.findByPk(productId);
  console.log(product);

  const order = await Order.findOne({
    where: {
      userId,
      [Op.or]: [
        {
          status: "carrito",
        },
      ],
    },

  })
  await order.setProducts(product, { through: { quantity } });
  console.log(order)

  const ordep = await Order_products.findAll(
    {
      where: {
        orderId: order.id,
        productId
      }
    })
  res.json(ordep)
})

server.delete('/:orderId/order/:productId', async (req, res) => {
  const { orderId, productId } = req.params;

  const product = await Product.findByPk(productId);
  console.log(product);

  
  const ordep = await Order_products.destroy({
      where: {
          orderId,
          productId
      },
    }
    );
  res.json(ordep)
})


module.exports = server;
