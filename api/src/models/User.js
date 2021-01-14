
const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const User = sequelize.define('user', {
        givenname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        familyname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,            
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                if(value) {
                    const salt = bcrypt.genSaltSync(10)
                    const hash = bcrypt.hashSync(value, salt)
                    this.setDataValue("password", hash)
                }
            }
        },
        googleID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        facebookID: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        photoURL: {
            type: DataTypes.STRING,
            allowNull: true,
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
            type: DataTypes.ENUM('deleted','user', 'admin'),
            allowNull: false,
            defaultValue: "user"
        }
    });
    User.prototype.compare = function (pass) {
        return bcrypt.compareSync(pass, this.password)
    };

    return User;
};