import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { productDetail } from './productdetail.model.js'
import { shoppingDetail } from './shoppingdetail.model.js'
import { losses } from './losses.model.js'

export const supplies = sequelize.define('Supplies', {

    ID_Supplies: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Supplies: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre del insumo es requerido"
            },
            customValidate(value) {
                if (!/^[A-ZÑñ][a-zA-ZÑñ\s]*$/.test(value)) {
                    throw new Error('Nombre: Se debe comenzar con mayúscula y puede contener letras, espacios y la letra "ñ".');
                }
            },
            len: {
                args: [3, 30],
                msg: 'El nombre del insumo debe tener de 3 a 30 caracteres.'
            }
        }
    },

    Unit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del insumo es requerido"
            },
            isInt: true,
            min: 0,
            max: 99999999
        },
    },

    Measure: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notNull: {
                msg: "La medida del insumo es requerida"
            },
            customValidate(value) {
                if (!/^[A-Za-zÑñ\s()]+$/.test(value)) {
                    throw new Error('Debe comenzar con mayúscula y puede contener letras, espacios, la letra "ñ" y paréntesis.');
                }
            }
        },
    },

    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El stock del insumo es requerido"
            },
            isInt: true,
            min: 0,
            max: 9999
        },
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

supplies.hasMany(productDetail, {
    foreignKey: 'Supplies_ID',
    sourceKey: 'ID_Supplies'
})

productDetail.belongsTo(supplies, {
    foreignKey: 'Supplies_ID',
    targetKey: 'ID_Supplies'
})

supplies.hasMany(shoppingDetail, {
    foreignKey: 'Supplies_ID',
    sourceKey: 'ID_Supplies'
})

shoppingDetail.belongsTo(supplies, {
    foreignKey: 'Supplies_ID',
    targetKey: 'ID_Supplies'
})

supplies.hasMany(losses, {
    foreignKey: 'Supplies_ID',
    sourceKey: 'ID_Supplies'
})

losses.belongsTo(supplies, {
    foreignKey: 'Supplies_ID',
    targetKey: 'ID_Supplies'
})