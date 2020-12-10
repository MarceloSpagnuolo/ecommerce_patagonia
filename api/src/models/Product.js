const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appearance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      valueDefalut: 0,
    },
    volume: {
      type: DataTypes.ENUM('355 cc', '473 cc', '730 cc'),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      valueDefalut: '../images/nodisponible.jpg'
    }
  });
};
