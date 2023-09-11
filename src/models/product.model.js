import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { recipe } from './recipe.model.js';
import { detail_sale } from './detail_sale.model.js'

export const product = sequelize.define('PRODUCTOS', {
    ID_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Producto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Imagen: {
        type: DataTypes.BLOB,
        allowNull: false,
        unique: true
    }
});

product.hasMany(recipe, {
    foreignKey: 'Productos_ID',
    sourceKey: 'ID_PRODUCTO'
})

recipe.belongsTo(product, {
    foreignKey: 'Productos_ID',
    targetId: 'ID_PRODUCTO'
})

product.hasMany(detail_sale, {
    foreignKey: 'Productos_ID',
    sourceKey: 'ID_PRODUCTO'
})

detail_sale.belongsTo(product, {
    foreignKey: 'Productos_ID',
    targetId: 'ID_PRODUCTO'
})