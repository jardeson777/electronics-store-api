import { DataTypes } from "sequelize";
import { db } from "../config/databaseConnection";

class TypeUserEntity {
  private entitie = db.define("type_user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  public get() {
    this.entitie.sync().then(() => {
      this.entitie.findOrCreate({
        where: { id: 1 },
        defaults: {
          id: 1,
          description: "seller",
        },
      });
      this.entitie.findOrCreate({
        where: { id: 2 },
        defaults: {
          id: 2,
          description: "buyer",
        },
      });
    });

    return this.entitie;
  }
}

export default new TypeUserEntity().get();
