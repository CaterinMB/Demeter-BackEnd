import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';

export const detail_shopping = sequelize.define('DETALLE_COMPRAS', {
    ID_DETALLE_COMPRAS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Valor_Insumo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false
});