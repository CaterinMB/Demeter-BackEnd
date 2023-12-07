import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const productDetail = sequelize.define('ProductDetails', {
    
    ID_ProductDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },

    Lot_ProductDetail: {
        type: DataTypes.DOUBLE,
        allowNull: false, 
        validate: {
            notNull:{
                msg: "La cantidad del insumo requerido"
            }, 
            isInt: true, 
            min: 0,
            max: 9999
        },
    },

    Measure: {
        type: DataTypes.STRING(15),
        allowNull: false, 
        validate: {
            notNull:{
                msg: "La medida del insumo es requerido"
            }, 
            customValidate(value) {
                if (!/^[A-ZÑñ][a-zA-ZÑñ\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras, espacios y la letra "ñ".');
                }
            }
        },
    }
    
}, {
    timestamps: false
});
