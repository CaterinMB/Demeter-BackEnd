import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: "demeter",
  dialect: "mysql",
  host: "localhost",
  password: "98757682",
  username: "root"
});
// export const sequelize = new Sequelize(
//   'demeter',
//   'root',
//   '98757682',
//   {
//     host: 'localhost',
//     dialect: 'mysql' 
//   }
// );