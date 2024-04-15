
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Product, Comment, ProductSummary } from '../models/index';
import productService from '../services/productService';
import categorySummaryService from '../services/categorySummaryService';

class summaryController {
    public async getAllSummariesByCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = req.params.categories.split(',');
            const type = req.params.type;

            const summaries = await categorySummaryService.getAllSumariesByCategory(categories, type);
            res.status(200).json(summaries);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

 

}

export default summaryController;
