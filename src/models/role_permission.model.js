import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';

export const role_permission = sequelize.define('DETALLE_ROLES', {
    ID_ROL_PERMISOS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
});