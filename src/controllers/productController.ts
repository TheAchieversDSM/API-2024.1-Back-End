
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Product, Comment, Summary } from '../models/index';

class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            console.log("entrei aqui");
            const productRepository = getRepository(Product);
            const products = await productRepository.find();
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getProductsByCategory(req: Request, res: Response) {
        const category = req.params.category;
        try {
          const products = await getRepository(Product).find({
            where: { category: category },
          });
          return res.json(products);
        } catch (error) {
          console.error("Error fetching products by category:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }

      async getProductsBySubCategory(req: Request, res: Response) {
        const subcategory = req.params.subcategory;
        try {
          const products = await getRepository(Product).find({
            where: { subcategory: subcategory },
          });
          return res.json(products);
        } catch (error) {
          console.error("Error fetching products by subcategory:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }

    public async deleteAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const entityManager = getManager();
            await entityManager.query('DROP SCHEMA db_schema CASCADE; CREATE SCHEMA db_schema;');
            res.status(200).json({ message: 'All tables dropped successfully' });
        } catch (error) {
            console.error('Error deleting all tables:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default ProductController;
