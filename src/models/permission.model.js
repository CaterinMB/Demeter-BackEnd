import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { role_permission } from './role_permission.model.js';

export const permissions = sequelize.define('PERMISOS', {
    ID_PERMISO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Permiso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            noSpecialCharacters(value) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if (specialCharacters.test(value)) {
                  throw new Error('Este campo no puede contener caracteres especiales');
                }
            },
            noNumbers(value) {
                if (/[0-9]/.test(value)) {
                    throw new Error('Este campo no puede contener números');
                } 
            }
        }
    },
    _Url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

permissions.hasOne(role_permission, {
    foreignKey: 'Permiso_ID',
    sourceKey: 'ID_PERMISO'
})

role_permission.belongsTo(permissions, {
    foreignKey: 'Permiso_ID',
    targetKey: 'ID_PERMISO'
})