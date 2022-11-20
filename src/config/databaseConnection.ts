import { Sequelize } from "sequelize";

export const db = new Sequelize("electronics_store_db", "root", "", {
  host: "localhost",
  password: "",
  dialect: "mysql",
  port: 3308,
});
