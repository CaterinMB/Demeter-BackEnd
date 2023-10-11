import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shopping } from './Shopping.model.js'

export const supplier = sequelize.define('Suppliers', {

    ID_Supplier: {
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
            noSpecialCharacters(value) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if (specialCharacters.test(value)) {
                    throw new Error('Este campo no puede contener caracteres especiales');
                }
            },
            noNumbers(value) {
                if (/[0-9]/.test(value)) {
                    throw new Error('Este campo no puede contener números');
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
            len: {
                args: [8, 10],
                msg: 'El campo de número de identificacion debe ser mayor de 8 y menos de 10.'
            },
            isNumeric: {
                msg: 'El campo de número de identificacion debe contener solo números'
            },
            isValidFormat(value) {
                const numericRegex = /^[0-9]+$/;
                if (!numericRegex.test(value.toString())) {
                    throw new Error('El campo de número de identificacion debe contener solo números');
                }
            }
        }
    },

    Name_Supplier: {
        type: DataTypes.STRING(50), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            noSpecialCharacters(value) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if (specialCharacters.test(value)) {
                    throw new Error('Este campo no puede contener caracteres especiales');
                }
            },
            noNumbers(value) {
                if (/[0-9]/.test(value)) {
                    throw new Error('Este campo no puede contener números');
                }
            },
            len: {
                args: [5, 50],
                msg: 'El nombre debe tener de 5 a 50 caracteres.'
            }
        }
    },

    Phone: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El telefono es requerido'
            },
            len: {
                args: [7, 10],
                msg: 'El campo de número de identificacion debe ser mayor de 7 y menos de 10.'
            },
            isNumeric: {
                msg: 'El campo de número de identificacion debe contener solo números'
            },
            isValidFormat(value) {
                const numericRegex = /^[0-9]+$/;
                if (!numericRegex.test(value.toString())) {
                    throw new Error('El campo de número de identificacion debe contener solo números');
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

    City: {
        type: DataTypes.STRING(20), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'La ciudad es requerido'
            },
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

supplier.hasMany(shopping, {
    foreignKey: 'Supplier_ID',
    sourceKey: 'ID_Supplier'
})

shopping.belongsTo(supplier, {
    foreignKey: 'Supplier_ID',
    targetKey: 'ID_Supplier'
})