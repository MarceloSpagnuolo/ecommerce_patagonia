const server = require("express").Router();
const { DATE } = require("sequelize");
const db = require("../db.js");
const { Order, Order_products, User, Product } = db
const adminAuth = require("../utils/authMiddleware.js")

server.get("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const order = await Order.findOne({
    where: {
      userId,
      status: "carrito"
    },
    include: [Product]
  })
  if(!order) {
    const newOrder = await Order.create({
      total: 0,
      date: Date.now(),
      userId,
      status: "carrito",
    })
    !newOrder ? res.sendStatus(400) : res.json(newOrder);
  }
  order && res.json(order);
})

server.get("/:orderId/recupera", async (req, res) => {
  const { orderId } = req.params;
  
  await Order.update(
      { status: "carrito" },
      { where: {
      id: orderId
      }}
    )

    const orden = await Order.findOne({
      where: { id: orderId },
      include: [ Product ]
    })

    if (orden && orden.products) {
      orden.products.map( async (elem) => {
        //var newSotck = elem.Order_products.quantity + elem.stock
        await Product.update(
          { stock: elem.stock + elem.Order_products.quantity },
          { where: { id: elem.id }}
        )
      })
    }

  !orden ? res.sendStatus(404) : res.json(orden);
})

//model order = total tiene default value al igual que carrito
//ergo = no es necesario mandarlos por body ni hacer comprobaciones
//(initial values: 0 y "carrito" respectivamente)
////////////CREACION MANUAL DE CARRITO (para cuando haga click en agregar carrito)////////////////
server.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { total, date, status } = req.body;

  (!userId) && res.send("Falta el valor userid").status(400);

  const order = await Order.create({
    total,
    date,
    status,
    userId,
  });

  !order ? res.sendStatus(400) : res.json(order).status(201);
});

//////////////////S38////////////// Agregar item al carrito. No se puede agregar un producto que ya existe.
//Se cambió la ruta para que sea /order/1/cart/1 por ejemplo. Más limpia y legible a simple vista.
server.post("/:orderId/cart/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity, unitprice } = req.body;

  (!orderId || !productId || !quantity || !unitprice) && res.send("Falta orderid, productid, quantity o unitprice").status(400);


  //Primero vamos a ver si ya se encuentra el producto agregado al carrito
  const producto = await Order_products.findOne({
    where: {
      orderId,
      productId
    }
  });

  if(producto) {    //Si el producto ya está agregado al carrito

    const singleProduct = await Product.findOne({
      where: {
        id: productId
      }
    })

    var cantidad = producto.quantity + quantity;
    
    cantidad = cantidad > singleProduct.stock ? singleProduct.stock : cantidad
    
      await Order_products.update({
        quantity: cantidad},
        {where: {
          orderId,
          productId
        }
      })
    
  } else {    //Si el producto no estaba agregado al carrito
    await Order_products.create({
      orderId,
      productId,
      quantity,
      unitprice,
    });
  }

  const order = await Order.findOne({
    where: {
      id: orderId
    },
    include: [ Product ]
  })
  
  !order ? res.sendStatus(400) : res.json(order).status(200);
});

////////////////S44////////////////
//// 'Get Orders' route = '/'
server.get("/", adminAuth, async (req, res, next) => {
  //Get de todas o una orden específica con sus productos
  let { limit, offset, order, where, include } = req.query; //Destructuring del Query
  // order tiene que recibier un array con la columna entre comillas dobles
  // /products/?limit=5&offset=5&order=["name"]
  // /products/?order=["id"]
  order && (order = JSON.parse(order)); // Parseando a Json el string recibido
  // /products/?where={"id":5}
  where && (where = JSON.parse(where));
  // /products/?where={%22id%22:5}&include=[%22categories%22] El valor de include debe ir en minúscula y plural
//   if(include) {
//        (include = JSON.parse(include));
//        include = getIncludes(include)
//     }
    include && (include = JSON.parse(include));

  const orders = await Order.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
    
  !orders ? res.sendStatus(400) : res.json(orders).status(200);
});


//////////RUTA EXTRA///////////////
// get orders/filter se pasa el filtro de busqueda en el query. Acepta ?status=valor
// siendo valor = "carrito", "creada", "procesando", "cancelada", "completa"
// incluye Order con el modelo User y Products
server.get("/filter/", adminAuth, async (req, res) => {
  const { status } = req.query;
  let parametrosQuery;

  !status ?
    parametrosQuery = {
        order: ['id'],
      include: [
        {
          model: User,
        },
        {
          model: Product,
        },
      ],
    }
  : 
    parametrosQuery = {
        order: ['id'],
      where: { status },
      include: [
        {
          model: User,
        },
        { model: Product },
      ],
    }; 

  const orderFilter = await Order.findAll(parametrosQuery);
  !orderFilter ? res.sendStatus(400) : res.json(orderFilter).status(200);
});

///////////////////S47/////////////////
//Considerando que se actualiza el carrito, se pide que obligatoriamente manden id, total, date y status
//Si sólo quieren cambiar un parámetro, deben mandar todos manteniendo el valor los que no quieran que se cambien.
//Puede devolver undefined si la orden a modificar no existe.
server.put(`/:id`, async (req, res) => {
  const { id } = req.params;

  const { total, date, status } = req.body;

  (!date || !id || !total || !status) && res.send("Falta valor date, id, total o status").status(400);

  const update = await Order.update(
    {
      total,
      date,
      status,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  const orden = Order.findOne({
    where: {
      id
    },
    include: [ Product ]
  })

  !orden ? res.sendStatus(400) : res.json(orden);
});

///////////////Ruta que busca por ID incluyendo user y product////////////

server.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [User, Product],
  });
  !order ? res.sendStatus(400) : res.json(order);
});

//eliminar un producto del carrito
server.delete("/:orderId/cart/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  await Order_products.destroy({
    where: {
      orderId,
      productId
    }
  });
  const order = await Order.findOne({
    where: {
      id: orderId
    },
    include: [ Product ]
  })
  !order ? res.sendStatus(400) : res.json(order);
});

//vaciar el carrito
server.delete("/:orderId/products", async (req, res) => {
  const { orderId } = req.params;
  await Order_products.destroy({
    where: {
      orderId
    }
  });
  const order = await Order.findOne({
    where: {
      id: orderId
    },
    include: [ Product ]
  })
  !order ? res.sendStatus(400) : res.json(order);
});

module.exports = server;