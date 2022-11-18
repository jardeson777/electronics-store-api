import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginTDO } from "../dto/login.tdo";
import { isValidCPF } from "../utils/validationCpf";

class AuthController {
  public login(req: Request, res: Response): void {
    const dataLogin: LoginTDO = req.body;

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

    res.status(200).send("Login");
  }

  public register(req: Request, res: Response): void {
    const dataRegister: LoginTDO = req.body;
  }
}

export default new AuthController();
