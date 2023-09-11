import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { product } from './product.model.js';

export const category_product = sequelize.define('CATEGORIA_PRODUCTOS', {
    ID_CATEGORIA_PRODUCTOS: {
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
});

category_product.hasMany(product, {
    foreignKey: 'CategoriaPreductos_ID',
    sourceKey: 'ID_CATEGORIA_PRODUCTOS'
})

product.belongsTo(category_product, {
    foreignKey: 'CategoriaPreductos_ID',
    targetId: 'ID_CATEGORIA_PRODUCTOS'
})