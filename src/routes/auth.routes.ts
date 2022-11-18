import express from "express";
import authController from "../controllers/auth.controller";

const Auth = express.Router();

Auth.post("/login", authController.login);

export default Auth;
