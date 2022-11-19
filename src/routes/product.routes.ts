import express from "express";
import productController from "../controllers/product.controller";

const ProductRouter = express.Router();

ProductRouter.get("/products", productController.getAll);

export default ProductRouter;
