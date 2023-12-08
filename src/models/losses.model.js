import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const losses =  sequelize.define('Losses', {

    ID_Losses: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    }, 

    Unit: {
        type: DataTypes.DOUBLE,
        allowNull: false, 
        validate: {
            notNull:{
                msg: "La cantidad del insumo perdido es requerido"
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
            notNull:{
                msg: "La medida del insumo es requerido"
            }, 
            customValidate(value) {
                if (!/^[A-Za-zÑñ\s()]+$/.test(value)) {
                    throw new Error('Debe comenzar con mayúscula y puede contener letras, espacios, la letra "ñ" y paréntesis.');
                }
            }
        },
    },

    Reason: {
        type: DataTypes.STRING(250), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El motivo es requerido"
            }, 
            customValidate(value) {
                if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s,.]*$/.test(value)) { // Esta es la validación buena
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras, espacios, tildes, comas y puntos.');
                }
            },
            len: {
                args: [10, 250],
                msg: 'El motivo de la perdida debe tener de 30 a 250 caracteres.'
            }
        }
    }

}, {
    timestamps: false
});