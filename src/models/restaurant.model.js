import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { waiter } from './waiter.model.js'

export const restaurant = sequelize.define('RESTAURANTES', {
    ID_RESTAURANTE: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Restaurante: {
        type: DataTypes.STRING,
        required: true,
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
});

restaurant.hasMany(waiter, {
    foreignKey: 'Restaurante_ID',
    sourceKey: 'ID_RESTAURANTE'
})

waiter.belongsTo(restaurant, {
    foreignKey: 'Restaurante_ID',
    targetId: 'ID_RESTAURANTE'
})