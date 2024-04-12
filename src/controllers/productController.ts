
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Product, Comment, Summary } from '../models/index';
import productService from '../services/productService';

class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getProducts(0, 10);
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getProductsByCategory(req: Request, res: Response) {
        const category = req.params.category;
        try {
          const products = await productService.getProductsByCategory(category);
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

    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await productService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getProductAverageRating(req: Request, res: Response): Promise<void> {
        const productId = req.params.productId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        
        try {
            const averageRating = await productService.getProductAverageRating(productId, startDate, endDate);
            res.status(200).json(averageRating);
        } catch (error) {
            console.error('Error fetching product average rating:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getAverageRatingByCategory(req: Request, res: Response): Promise<void> {
      const category = req.params.category;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      
      try {
          const averageRating = await productService.getAverageRatingByCategory(category, startDate, endDate);
          res.status(200).json(averageRating);
      } catch (error) {
          console.error('Error fetching product average rating by category:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }

}

export default ProductController;
