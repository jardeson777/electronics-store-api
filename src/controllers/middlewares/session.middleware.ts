import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRETE } from "../../constants";

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];
  jwt.verify(token, SECRETE, (err, result) => {
    if (err) return res.status(401).send("Unauthorized token").end();

    req["userId"] = result["userId"];
    next();
  });
};
