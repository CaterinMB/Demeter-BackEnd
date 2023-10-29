import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeterdefinitiva',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);