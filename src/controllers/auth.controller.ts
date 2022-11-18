import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginTDO } from "../dto/login.tdo";

class AuthController {
  login = (req: Request, res: Response) => {
    const dataLogin: LoginTDO = req.body;

    console.log(dataLogin);
    res.status(200).send("Login");
  };
}

export default new AuthController();
