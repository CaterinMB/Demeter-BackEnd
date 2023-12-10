import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeterprueba2',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);