import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { product } from './Product.model.js'

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

category.hasMany(product, {
    foreignKey: 'Category_ID',
    sourceKey: 'ID_Category'
})

product.belongsTo(category, {
    foreignKey: 'Category_ID',
    targetKey: 'ID_Category'
})