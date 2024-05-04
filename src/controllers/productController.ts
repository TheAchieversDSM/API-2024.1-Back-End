
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Product, Comment, ProductSummary } from '../models/index';
import productService from '../services/productService';
import commentService from '../services/commentService';

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

            categories.sort()

            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getProductAverageRating(req: Request, res: Response): Promise<void> {
        const productId = req.params.productId;
        const startDate = req.query.startDate as string ;
        const endDate = req.query.endDate as string;
        
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
      const startDate = req.query.startDate as string || '2000-01-01';
      const endDate = req.query.endDate as string || '3099-12-31';
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
  
      try {
          const { averageResponse, totalPages } = await productService.getAverageRatingByCategory(category, startDate, endDate, page, limit);
  
          res.status(200).json({
              data: averageResponse,
              pagination: {
                  page,
                  limit,
                  totalPages,
              },
          });
      } catch (error) {
          console.error('Error fetching product average rating by category:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  public async getCommentCountByState(req: Request, res: Response): Promise<void> {
    const state = req.params.state;
    const startDate = req.query.startDate as string || '2000-01-01';
    const endDate = req.query.endDate as string || '3099-12-31';
    
    try {
        const commentCount = await productService.getCommentCountByState(state, startDate, endDate);
        res.status(200).json({ commentCount });
    } catch (error) {
        console.error('Error fetching comment count by state:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

public async getAverageRatingByStateAndProduct(req: Request, res: Response): Promise<void> {
    const state = req.params.state;
    const productId = req.params.productId;
    const startDate = req.query.startDate as string || '2000-01-01';
    const endDate = req.query.endDate as string || '3099-12-31';

    try {
        const averageRating = await productService.getAverageRatingByStateAndProduct(state, productId, startDate, endDate);
        res.status(200).json(averageRating);
    } catch (error) {
        console.error('Error fetching average rating by state and product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

public async getProductDemography(req: Request, res: Response): Promise<void> {
    try {
        const productId = req.params.productId; 
        const date: Date = new Date(req.params.date); 
        const state = req.params.state;

        const commentsInfo = await commentService.getCommentsAgeGenderAndRatingByDate(productId, date, state);
        
        res.json(commentsInfo);
    } catch (error) {
        console.error('Error in getCommentsAgeGenderAndRatingByDateController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

}

export default ProductController;
