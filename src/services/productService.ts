import { In, Repository, getRepository } from 'typeorm';
import { Product } from '../models/index';
import commentService from './commentService';
import { DataBaseSource } from '../config/database';

type AverageResponse = {
    date: string;
    averageRating: number;
};

class ProductService {

    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = DataBaseSource.getRepository(Product);
    }

    public async checkAndSaveProduct(productId: string, productName: string, siteCategoryLv1: string, siteCategoryLv2: string): Promise<Product> {
        try {
            const existingProduct = await this.productRepository.findOne({ where: { id: Number(productId) } });

            if (existingProduct) {
                return existingProduct;
            } else {
                const newProduct = new Product();
                newProduct.id = Number(productId);
                newProduct.name = productName;
                newProduct.category = siteCategoryLv1;
                newProduct.subcategory = siteCategoryLv2;

                await this.productRepository.save(newProduct);
                return newProduct;
            }
        } catch (error: any) {
            if (error.code === '23505') {
                return await this.productRepository.findOne({ where: { id: Number(productId) } }) as Product;
            }
            console.error('Error checking and saving product:', error);
            throw error;
        }
    }

    public async getProducts(skip: number, limit: number): Promise<Product[]> {
        try {
            return await this.productRepository.find({
                skip: skip,
                take: limit
            });
        } catch (error) {
            console.error('Error getting products:', error);
            throw error;
        }
    }

    public async getAllCategories(): Promise<string[]> {
        try {
            const categories = await this.productRepository.createQueryBuilder().select('category').distinct(true).getRawMany();
            return categories.map((category) => category.category);
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }

    public async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            return await this.productRepository.find({ where: { category } });
        } catch (error) {
            console.error('Error getting products by category:', error);
            throw error;
        }
    }

    public async getProductAverageRating(productId: string, startDate: string, endDate: string): Promise<any> {
        try {
            const product = await this.productRepository.findOne({ 
                where: { id: Number(productId) }, 
                relations: ['comments'] 
            });
    
            if (!product) {
                throw new Error('Product not found');
            }
    
            const comments = await commentService.getCommentsByProductId(productId);    
            const filteredComments = comments.filter(comment => 
                new Date(comment.date) >= new Date(startDate) && new Date(comment.date) <= new Date(endDate)
            );
    
            const dateRating: any[] = filteredComments.map(comment => {
                return {
                    date: comment.date,
                    averageRating: comment.rating
                };
            });
            
            const averageRating = dateRating.reduce((acc, curr) => {
                acc[curr.date] = acc[curr.date] || [];
                acc[curr.date].push(curr.averageRating);
                return acc;
            }, Object.create(null));
    
            for (const date in averageRating) {
                const ratings = averageRating[date];
                const sum = ratings.reduce((acc: number, curr: number) => acc + curr, 0);
                averageRating[date] = sum / ratings.length;
            }
            
            const averageRatingArray = Object.entries(averageRating).map(([date, rating]) => ({
                date,
                averageRating: rating
            }));
    
            return averageRatingArray;
    
        } catch (error) {
            console.error('Error getting product average rating:', error);
            throw error;
        }
    }

    public async getAverageRatingByCategory(
        category: string,
        startDate: string = '2000-01-01',
        endDate: string = '3099-12-31',
        page: number = 1,
        limit: number = 1000
    ): Promise<{ averageResponse: { date: string; averageRating: number }[]; totalPages: number }> {
        try {
            const products = await this.productRepository.find({
                where: { category },
                relations: ['comments']
            });
    
            if (!products.length) {
                throw new Error('No products found in this category');
            }
    
            const averageRatings: { [date: string]: number[] } = {};
    
            for (const product of products) {
                const comments = await commentService.getCommentsByProductId(String(product.id));
                for (const comment of comments) {
                    const commentDate = new Date(comment.date).toISOString().split('T')[0];
                    if (startDate && endDate && commentDate >= startDate && commentDate <= endDate) {
                        if (!averageRatings[commentDate]) {
                            averageRatings[commentDate] = [];
                        }
                        averageRatings[commentDate].push(comment.rating);
                    }
                }
            }
    
            const averageResponse: { date: string; averageRating: number }[] = [];
            for (const date in averageRatings) {
                const ratings = averageRatings[date];
                const averageRating = parseFloat((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1));
                averageResponse.push({ date, averageRating });
            }
    
            averageResponse.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
            const totalPages = Math.ceil(averageResponse.length / limit);
    
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedResponse = averageResponse.slice(startIndex, endIndex);
    
            return {
                averageResponse: paginatedResponse,
                totalPages,
            };
        } catch (error) {
            console.error('Error getting product average rating by category:', error);
            throw error;
        }
    }
    
    public async getAverageRatingByStateAndProduct(
        state: string,
        productId: string,
        startDate: string = '2000-01-01',
        endDate: string = '3099-12-31',
        page: number = 1,
        limit: number = 1000
    ): Promise<{ averageResponse: { date: string; averageRating: number }[]; totalPages: number }> {
        try {
            const comments = await commentService.getCommentsByProductId(productId);
    
            const averageRatings: { [date: string]: number[] } = {};
    
            for (const comment of comments) {
                const commentDate = new Date(comment.date).toISOString().split('T')[0];
    
                if (
                    comment.state === state &&
                    commentDate >= startDate &&
                    commentDate <= endDate
                ) {
                    if (!averageRatings[commentDate]) {
                        averageRatings[commentDate] = [];
                    }
                    averageRatings[commentDate].push(comment.rating);
                }
            }
    
            const averageResponse: { date: string; averageRating: number }[] = [];
    
            for (const date in averageRatings) {
                const ratings = averageRatings[date];
                const averageRating = parseFloat((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1));
                averageResponse.push({ date, averageRating });
            }
    
            averageResponse.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
            const totalPages = Math.ceil(averageResponse.length / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
    
            const paginatedResponse = averageResponse.slice(startIndex, endIndex);
    
            return {
                averageResponse: paginatedResponse,
                totalPages,
            };
        } catch (error) {
            console.error('Error getting average rating by state and product:', error);
            throw error;
        }
    }
    
    public async getCommentCountByState(
        state: string,
        startDate: string = '2000-01-01',
        endDate: string = '3099-12-31'
    ): Promise<number> {
        try {
            const products = await this.getProducts(0, 100000000);
            
            if (!products.length) {
                throw new Error('No products found');
            }
            
            let commentCount = 0;
            
            for (const product of products) {
                const comments = await commentService.getCommentsByProductId(String(product.id));
                
                for (const comment of comments) {
                    const commentDate = new Date(comment.date).toISOString().split('T')[0];
                    
                    if (
                        comment.state === state && 
                        commentDate >= startDate && 
                        commentDate <= endDate
                    ) {
                        commentCount++;
                    }
                }
            }
            
            return commentCount;
        } catch (error) {
            console.error('Error getting comment count by state:', error);
            throw error;
        }
    }  

    public async getAllRecomendationByComments(productsId: number[]): Promise<any[]> {
        try {
            const products = await this.productRepository.find({
                where: { id: In(productsId) },
                relations: ['comments']
            });
    
            if (!products.length) {
                throw new Error('No products found');
            }
    
            const productsRecomendation: any[] = [];
            for (const product of products) {
                const comments = await commentService.getCommentsByProductId(String(product.id));
                
                const { recommendedCount, notRecommendedCount } = comments.reduce((acc, comment) => {
                    if (comment.recommended) {
                        acc.recommendedCount += 1;
                    } else {
                        acc.notRecommendedCount += 1;
                    }
                    return acc;
                }, { recommendedCount: 0, notRecommendedCount: 0 });
    
                productsRecomendation.push({
                    productName: product.name,
                    productId: product.id,
                    recommendedCount: recommendedCount,
                    notRecommendedCount: notRecommendedCount
                });
            }
            return productsRecomendation;
        } catch (error) {
            console.error('Error getting recomendation by comments:', error);
            throw error;
        }
    }
    
    
}

export default new ProductService();
