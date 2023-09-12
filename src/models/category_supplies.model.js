import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { supplies } from './supplies.model.js';

export const category_supplies = sequelize.define('CATEGORIA_INSUMOS', {
    ID_CATEGORIA_INSUMO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Categoria: {
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
    },
    Imagen: {
        type: DataTypes.BLOB,
        required: true
    }
}, {
    timestamps: false
});

category_supplies.hasMany(supplies, {
    foreignKey: 'CategoriaInsumos_ID',
    sourceKey: 'ID_CATEGORIA_INSUMO'
})

supplies.belongsTo(category_supplies, {
    foreignKey: 'CategoriaInsumos_ID',
    targetId: 'ID_CATEGORIA_INSUMO'
})