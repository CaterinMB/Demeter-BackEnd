import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'basedefinitiva',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);