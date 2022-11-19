import { DataTypes } from "sequelize";
import { db } from "../config/databaseConnection";

class ProductEntity {
  private entitie = db.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
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

export default new ProductEntity().get();
