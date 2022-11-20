import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRETE } from "../constants";
import { LoginDTO } from "../dto/login.dto";
import userEntity from "../entities/user.entity";
import { UserModel } from "../models/user.model";
import { isValidCPF } from "../utils/validationCpf";

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

    try {
      const data = await userEntity.findOne({
        where: {
          cpf: dataLogin.cpf,
          password: dataLogin.password,
        },
      });

      if (data) {
        const token = jwt.sign({ userId: data.dataValues.id }, SECRETE, {
          expiresIn: 6000,
        });

        res.status(200).json({ token });
        return;
      }

      throw new Error("Failed login");
    } catch (error) {
      res.status(400).json({ message: "Failed login" });
    }
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

    try {
      const dbResult = await userEntity.create({
        name: dataRegister.name,
        cpf: dataRegister.cpf,
        password: dataRegister.password,
      });

      if (dbResult.dataValues) {
        res
          .status(200)
          .send(`User ${dataRegister.name} registered with success`);
      }
    } catch (error) {
      res.status(400).send(`User ${dataRegister.cpf} already registered`);
    }
  }
}

export default new AuthController();
