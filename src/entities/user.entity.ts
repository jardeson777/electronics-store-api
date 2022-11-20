import { DataTypes } from "sequelize";
import { db } from "../config/databaseConnection";

class UserEntity {
  private entitie = db.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  constructor() {
    this.entitie.sync();
  }

  public get() {
    return this.entitie;
  }
}

export default new UserEntity().get();
