import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { sale } from './sale.model.js';

export const waiter = sequelize.define('MESEROS', {
    ID_MESERO: {
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
    },
    Estado: {
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

waiter.hasMany(sale, {
    foreignKey: 'Mesero_ID',
    sourceKey: 'ID_MESERO'
})

sale.belongsTo(waiter, {
    foreignKey: 'Mesero_ID',
    targetId: 'ID_MESERO'
})