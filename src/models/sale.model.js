import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { detail_sale } from './detail_sale.model.js'

export const sale = sequelize.define('VENTAS', {
    ID_VENTA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Pago: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Venta_Rapida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    Descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Sub_Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    EstadoVenta: {
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

sale.hasMany(detail_sale, {
    foreignKey: 'Venta_ID',
    sourceKey: 'ID_VENTA'
})

detail_sale.belongsTo(sale, {
    foreignKey: 'Venta_ID',
    targetId: 'ID_VENTA'
})