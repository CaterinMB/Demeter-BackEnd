import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { role } from "./role.model.js";

export const module = sequelize.define('Modules', {

    ID_Module: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Module: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre es requerido"
            },
            customValidate(value) {

                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

}, {
    timestamps: false
});

role.hasMany(module, {
    foreignKey: 'Role_ID',
    sourceKey: 'ID_Role'
})

module.belongsTo(role, {
    foreignKey: 'Role_ID',
    targetKey: 'ID_Role'
})