import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { roleDetail } from './roledetail.model.js';

export const permission = sequelize.define('Permissions', {

    ID_Permission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    Name_Permission: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El nombre es requerido"
            },
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    }

}, {
    timestamps: false
});

permission.hasMany(roleDetail, {
    foreignKey: 'Permission_ID',
    sourceKey: 'ID_Permission'
})

roleDetail.belongsTo(permission, {
    foreignKey: 'Permission_ID',
    targetKey: 'ID_Permission'
})