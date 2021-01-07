const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('image', {
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};