import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const roleDetail = sequelize.define('RoleDetails', {
    
    ID_RoleDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    }
    
}, {
    timestamps: false
});