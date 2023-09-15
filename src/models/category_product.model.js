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
    Imagen: {
        type: DataTypes.BLOB,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
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

category_product.hasMany(product, {
    foreignKey: 'CategoriaProductos_ID',
    sourceKey: 'ID_CATEGORIA_PRODUCTOS'
})

product.belongsTo(category_product, {
    foreignKey: 'CategoriaProductos_ID',
    targetId: 'ID_CATEGORIA_PRODUCTOS'
})