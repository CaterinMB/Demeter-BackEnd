import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { product } from './product.model.js'

export const productCategory =  sequelize.define('ProductCategorys', {

    ID_ProductCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    }, 

    Name_ProductCategory: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El nombre es requerido"
            }, 
            customValidate(value) {
                if (!/^[A-ZÑñ][a-zA-ZÑñ\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras, espacios y la letra "ñ".');
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

productCategory.hasMany(product, {
    foreignKey: 'ProductCategory_ID',
    sourceKey: 'ID_ProductCategory'
})

product.belongsTo(productCategory, {
    foreignKey: 'ProductCategory_ID',
    targetKey: 'ID_ProductCategory'
})
