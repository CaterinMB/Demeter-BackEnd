import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { typeUser } from './TypeUser.model.js'
import { shopping } from './Shopping.model.js'
import { sale } from './Sale.model.js'

export const user = sequelize.define('Users', {

    ID_User: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    }, 

    Type_Document: {
        type: DataTypes.STRING(15), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El tipo de documento es requerido"
            }, 
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    Document: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        unique: true,
        validate: {
            notNull: {
                msg: 'El documento es requerido'
            },
            isNumeric: {
                msg: 'El campo de número de identificacion debe contener solo números'
            }
        }
    },

    Name_User: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    LastName_User:{
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate:{
            notNull: {
                msg: 'El apellido es requerido'
            },
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
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
    },

    Restaurant: {
        type: DataTypes.STRING(15), 
        validate:{
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    State: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado es requerido'
            }
        }
    }
}, {
    timestamps: false
});

user.hasMany(typeUser, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})

typeUser.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})

user.hasMany(shopping, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})

shopping.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})

user.hasMany(sale, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})

sale.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})