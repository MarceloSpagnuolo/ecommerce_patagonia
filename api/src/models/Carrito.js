const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('carrito', {
        reference: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        order_status: {
            type: DataTypes.ENUM("carrito", "creada", "procesando", "cancelada", "completa")
        }
    });
};