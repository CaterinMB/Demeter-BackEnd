import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const login = sequelize.define('Logins', {

    ID_Login: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    Email: {
        type: DataTypes.STRING(80),
        allowNull: false, 
        unique: true,
        validate: {
            notNull: {
                msg: 'El correo es requerido'
            },
            isEmail: {
                msg: 'El correo electrónico debe ser válido y contener el símbolo "@"'
            }
        }
    }, 

    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La contraseña es requerida'
            }
        }
    }

}, {
    timestamps: false
});