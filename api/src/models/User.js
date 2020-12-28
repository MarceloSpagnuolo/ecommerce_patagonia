
const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const User = sequelize.define('user', {
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
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        hashedpassword: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value) {
                if(value) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(value, salt);
                    this.setDataValue("hashedpassword", hash);
                }
            }
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photoURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('guess','user', 'admin'),
            allowNull: false,
        }
    });
    User.prototype.compare = function (pass) {
        return bcrypt.compareSync(pass, this.hashedpassword)
    };
    return User;
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
