import express from "express";
import { validateSession } from "../controllers/middlewares/session.middleware";
import productController from "../controllers/product.controller";

const ProductRouter = express.Router();

ProductRouter.get("/products", validateSession, productController.getAll);
ProductRouter.post("/product", validateSession, productController.setProduct);

export default ProductRouter;
