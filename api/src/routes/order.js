const server = require("express").Router();
const { Order, Order_products, User, Product } = require("../db.js");



////////////CREACION MANUAL DE CARRITO (para cuando haga click en agregar carrito)////////////////
server.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const {
        total,
        date,
        status,
    } = req.body;
    (!total || !date || !userId) && res.sendStatus(400);
    const order = await Order.create({
        total,
        date,
        status,
        userId
    });
    !order ? res.sendStatus(400) :
        res.json(order).status(201);

})


//////////////////S38//////////////
server.post('/:orderId/order_products/:productsId', async (req, res) => {
    const { orderId, productsId } = req.params;
    const {
        cantidad,
        precio_unitario,
    } = req.body;
    (!orderId || !productsId || !cantidad || !precio_unitario) && res.sendStatus(400);

    const orderProducts = await Order_products.create({
        orderId,
        productsId,
        cantidad,
        precio_unitario
    });
    !orderProducts ? res.sendStatus(400) :
    res.json(orderProducts)
})


//// 'Get Orders' route in '/'
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
    Order.findAll({ limit, offset, order, where, include }) //Pasamos a findAll todos los argumentos
      .then((products) => {
        res.send(products).status(200);
      })
      .catch(next);
  });


// get orders)filter se pasa el filtro de busqueda en el body 
server.get('/filter', async (req, res) => {

	const {status} = req.query;
	let parametrosQuery;
	//console.log('el estado es ', status);

    if (!status){
        parametrosQuery = {
            include: [ { 
                model: User
            },{
                model: Product
            }]
        }
    }else{
        parametrosQuery = { 
            where: { status }, 
            include: [ { 
                model: User}, 
                {model: Product}] 
            }
    } 

	const orderFilter= await Order.findAll(parametrosQuery)	
	orderFilter ? res.json(orderFilter).status(200) : res.send("Ha ocurrido un error en el filtrado de ordenes").status(404);
});


///////////////////47/////////////////

server.put(`/:id`, async (req, res) => {
    const { id } = req.params

    const {total, date, status} = req.body

    const update = await Order.update(
        {
          total,
          date,
          status
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      !update ? res.sendStatus(400) : res.json(update);
})

///////////////Ruta que busca por ID incluyendo user y product////////////

server.get("/:orderId", async(req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({
        where: {
            id: orderId
        },
        include: [User,Product]
    });
    !order ? res.sendStatus(400) : res.json(order);
})


module.exports = server;