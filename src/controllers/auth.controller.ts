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

    res.status(200).json({ token });
  }

  public async register(req: Request, res: Response): Promise<void> {
    const dataRegister: UserModel = req.body;

    const passwordIsValid =
      dataRegister && dataRegister.password && dataRegister.password.length > 0;
    const nameIsValid =
      dataRegister && dataRegister.name && dataRegister.name.length > 0;
    const cpfIsValid =
      dataRegister && dataRegister.cpf && isValidCPF(dataRegister.cpf);

    if (!(passwordIsValid && nameIsValid && cpfIsValid)) {
      res.status(400).json({
        message: "failed registration, invalid data",
      });
    }

    const query = `
        INSERT INTO users(name, password, cpf) 
        VALUES ("${dataRegister.name}","${dataRegister.password}","${dataRegister.cpf}");
    `;

    try {
      const data = await db.query(query);
      if (data) {
        res
          .status(200)
          .send(`User ${dataRegister.name} registered with success`);
      }
    } catch (error) {
      res.status(400).send(`User already registered`);
    }
  }
}

export default new AuthController();
