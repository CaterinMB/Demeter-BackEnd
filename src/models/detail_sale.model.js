import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';

export const detail_sale = sequelize.define('DETALLE_VENTAS', {
    ID_DETALLE_VENTA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});