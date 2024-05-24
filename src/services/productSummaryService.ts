import { In, Repository } from 'typeorm';
import PlnApi from '../config/plnApi';
import { Comment, Product, ProductSummary } from '../models';
import { CategorySummary } from '../models/categorySummary';
import { DataBaseSource } from '../config/database';
import { UUID } from 'crypto';

class ProductSummaryService {

    private productSummaryRepository: Repository<ProductSummary>;  
    private productRepository: Repository<Product>;

    constructor() {
        this.productSummaryRepository = DataBaseSource.getRepository(ProductSummary);
        this.productRepository = DataBaseSource.getRepository(Product);
    }

    public async getAllSumariesByProduct(productsUuid: number[]): Promise<ProductSummary[]> {
        try {
            console.log('productsUuid:', productsUuid);
            return await this.productSummaryRepository.find({ where: { product: {id: In(productsUuid)} } });
        } catch (error) {
            console.error('Error getting all summaries by category:', error);
            throw error;
        }
    }   
}

export default new ProductSummaryService();
