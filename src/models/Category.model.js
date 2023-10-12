import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { supplies } from './Supplies.model.js'
import { product } from './Product.model.js'


export const category =  sequelize.define('Categorys', {

    ID_Category: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    }, 

    Name_Category: {
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

    Type_Supplier: {
        type: DataTypes.STRING(15),
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El tipo es requerido"
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

category.hasMany(supplies, {
    foreignKey: 'Category_ID',
    sourceKey: 'ID_Category'
})

supplies.belongsTo(category, {
    foreignKey: 'Category_ID',
    targetKey: 'ID_Category'
})

category.hasMany(product, {
    foreignKey: 'Category_ID',
    sourceKey: 'ID_Category'
})

product.belongsTo(category, {
    foreignKey: 'Category_ID',
    targetKey: 'ID_Category'
})