import { DataTypes } from "sequelize";
import { db } from "../config/databaseConnection";
import typeUserEntity from "./typeUser.entity";

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
    type: {
      type: DataTypes.INTEGER,
      references: {
        model: typeUserEntity,
        key: "id",
      },
    },
  });

  constructor() {
    this.entitie.sync();
    typeUserEntity.sync();
  }

  public get() {
    return this.entitie;
  }
}

export default new UserEntity().get();
