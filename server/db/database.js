import { Sequelize } from 'sequelize';
import { config } from '../config.js';

const { host, database, user, password } = config.db;
export const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  logging: false, // log in terminal
});
