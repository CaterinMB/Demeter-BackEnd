import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeterbase',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);