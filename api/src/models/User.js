
const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },  
        hashedpassword: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
        }
    });
};





// user.beforeCreate((user) => {
//     user.hashedPassword = "12345"
// })
//User.addHook('beforeCreate', async (user) => {
    //     const salt = await bcrypt.genSaltSync(8);
    //     user.hashedPassword = await bcrypt.hashSync(user.hashedPassword, salt);
    // });
    
    // User.addHook('beforeValiate', async (hashedPassword) => {
    //     return await bcrypt.compare(hashedPassword, this.hashedPassword);
    // });
    