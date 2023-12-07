import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const losses = sequelize.define('Losses', {

    ID_Losses: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Reason: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El motivo es requerido"
            },
            customValidate(value) {
                if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s,.]*$/.test(value)) {
                    throw new Error('El motivo de la pérdida debe comenzar con mayúscula y puede contener letras, espacios, tildes, comas y puntos.');
                }
            },
            len: {
                args: [10, 250],
                msg: 'El motivo de la pérdida debe tener de 10 a 250 caracteres.'
            }
        }
    },


    Unit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del insumo perdido es requerido"
            },
            isInt: true,
            min: 0,
            max: 99999999
        },
    }

}, {
    timestamps: true
});