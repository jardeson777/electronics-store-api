import { Request, Response } from "express";
import ProductEntity from "../entities/product.entity";
import { ProductModel } from "../models/product.model";

class ProductController {
  public async getAll(req: Request, res: Response) {
    const data = await ProductEntity.findAll();
    res.status(200).json({ products: data });
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const { dataValues } = await ProductEntity.findOne({
        where: { id },
      });
      res.status(200).json(dataValues);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  }

  public async setProduct(req: Request, res: Response) {
    const productSended: ProductModel = req.body;

    ProductEntity.create(productSended)
      .then(() => {
        res.status(201).send("Product added with success");
      })
      .catch(() => {
        res.status(400).send("Product not added");
      });
  }

  public async editProduct(req: Request, res: Response) {
    const product: ProductModel = req.body;
    const { id } = req.params;

    try {
      const dbResponse = await ProductEntity.update(
        {
          name: product.name,
          price: product.price,
          amount: product.amount,
        },
        {
          where: {
            id,
          },
        },
      );

      if (dbResponse[0]) {
        res.status(200).send("Product updated with success");
        return;
      }

      res.status(400).send("Product not changed");
    } catch (error) {
      res.status(400).send("Product not changed");
    }
  }
}

export default new ProductController();
