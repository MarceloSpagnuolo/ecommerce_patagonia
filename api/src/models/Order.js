const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('order', {
       
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("carrito", "creada", "procesando", "cancelada", "completa"),
            defaultValue: "carrito"
        }
    });
};


//model order = total tiene default value al igual que carrito
//ergo = no es necesario mandarlos por body ni hacer comprobaciones
//(initial values: 0 y "carrito" respectivamente)


