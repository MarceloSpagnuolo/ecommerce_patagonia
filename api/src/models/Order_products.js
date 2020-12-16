const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Order_products', {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        precio_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },     
    });
};


// order_products/:idOrder/:idProducts

/*
Order_products id=1
orderid = 1 (status=carrito)
productid= 1
cantidad = 2
precio_unitario = producto.precio


Order_products id=2
orderid = 1 (status=carrito)
productid = 2
cantidad = 2
precio_unitario = producto.precio


comprar
*/