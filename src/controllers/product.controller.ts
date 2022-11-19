import { Request, Response } from "express";
import ProductEntity from "../entities/product.entity";
import { ProductModel } from "../models/product.model";

class ProductController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const data = await ProductEntity.findAll();
    res.json({ products: data });
  }

  public async setProduct(req: Request, res: Response) {
    const productSended: ProductModel = req.body;

    ProductEntity.create(productSended)
      .then(() => {
        res.status(200).send("Product added with success");
      })
      .catch(() => {
        res.status(400).send("Product not added");
      });
  }
}

export default new ProductController();
