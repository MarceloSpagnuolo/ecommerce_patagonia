const { DataTypes, DATE } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('order', {
       
        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new DATE()
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


