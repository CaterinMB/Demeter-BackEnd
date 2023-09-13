import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { sale } from './sale.model.js';

export const payment_method = sequelize.define('METODO_PAGO', {
    ID_METODO_PAGO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
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
            }
        }
    }
}, {
    timestamps: false
});

payment_method.hasMany(sale, {
    foreignKey: 'MetodoPago_ID',
    sourceKey: 'ID_METODO_PAGO'
})

sale.belongsTo(payment_method, {
    foreignKey: 'MetodoPago_ID',
    targetId: 'ID_METODO_PAGO'
})