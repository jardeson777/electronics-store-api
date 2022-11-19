import { Express, json } from "express";
import cors from "cors";
import Auth from "./auth.routes";
import ProductRouter from "./product.routes";

const Routes = (app: Express) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Bem vindo a api");
  });

  app.use(json(), cors({ origin: "http://localhost" }), Auth, ProductRouter);
};

export default Routes;
