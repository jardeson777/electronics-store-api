import { Sequelize } from "sequelize";

export const db = new Sequelize("electronics_store_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3308,
});
