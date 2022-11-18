import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/databaseConnection";
import { LoginDTO } from "../dto/login.dto";
import { UserModel } from "../models/user.model";
import { isValidCPF } from "../utils/validationCpf";

const SECRETE = "123";
class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const dataLogin: LoginDTO = req.body;

    const dataLoginIsValid =
      dataLogin &&
      dataLogin.cpf &&
      dataLogin.password &&
      isValidCPF(dataLogin.cpf) &&
      dataLogin.password.length > 0;

    if (!dataLoginIsValid) {
      res.status(400).json({
        message: "Invalid login",
      });
    }

    const query = `
        SELECT * FROM users
        WHERE 
            cpf = "${dataLogin.cpf}"
            AND 
            password = "${dataLogin.password}";
    `;

    const data = await db.query(query);
    const user: UserModel = data[0][0] as UserModel;

    const token = jwt.sign({ userId: user.id }, SECRETE, {
      expiresIn: 6000,
    });

    /*
    CREATE TABLE users(
        id int NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        password varchar(11) NOT NULL,
        cpf varchar(11) NOT NULL,
        PRIMARY KEY(id),
        UNIQUE (cpf)
    );
    */

    res.status(200).json({ token });
  }

  public async register(req: Request, res: Response): Promise<void> {
    const dataRegister: UserModel = req.body;
    // const error
  }
}

export default new AuthController();
