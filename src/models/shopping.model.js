import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { detail_shopping } from './detail_shopping.model.js';

export const shopping = sequelize.define('COMPRAS', {
    ID_COMPRAS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fecha_Compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Valor_Compra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: false
});

shopping.hasMany(detail_shopping, {
    foreignKey: 'Compras_ID',
    sourceKey: 'ID_COMPRAS'
})

detail_shopping.belongsTo(shopping, {
    foreignKey: 'Compras_ID',
    targetId: 'ID_COMPRAS'
})