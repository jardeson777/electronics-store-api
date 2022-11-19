import { Request, Response } from "express";
import productEntitie from "../entities/product.entitie";

class ProductController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const data = await productEntitie.findAll();
    res.json({ products: data });
  }
}

export default new ProductController();
