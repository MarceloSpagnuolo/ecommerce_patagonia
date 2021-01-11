const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('review', {
        rate: {
            type: DataTypes.DECIMAL(10,1),
            allowNull: false,
            validate: {
                max: 5,
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: true,

        }
    });
};
