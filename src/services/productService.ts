
import { Repository, getRepository } from 'typeorm';
import { Product } from '../models/index'; 
import commentService from './commentService';
type AverageResponse =[{
    date: string;
    averageRating: number;
}]

interface AverageRatingByCategory {
    category: string;
    averageRating: number;
}
class ProductService {
    
    public async checkAndSaveProduct(productId: string, productName: string, siteCategoryLv1: string, siteCategoryLv2: string): Promise<Product> {
        try {

            const productRepository = getRepository(Product);
            const existingProduct = await productRepository.findOne({ where: { id: Number(productId) } });
 
            if (existingProduct) {
                return existingProduct;
            } else {
                const newProduct = new Product();
                newProduct.id =  Number(productId) ;
                newProduct.name = productName;
                newProduct.category = siteCategoryLv1;
                newProduct.subcategory = siteCategoryLv2;

                await productRepository.save(newProduct);
                return newProduct;
            }
        } catch (error: any) {
            if (error.code === '23505') {
                return await getRepository(Product).findOne({ where: { id: Number(productId) } }) as Product;
            }
            console.error('Error checking and saving product:', error);
            throw error; 
        }
    }

    public async getProducts(skip: number, limit: number): Promise<Product[]> {
        try {
            const productRepository = getRepository(Product);
            const products = await productRepository.find({
                skip: skip,
                take: limit
            });
            return products;
        } catch (error) {
            console.error('Error getting products:', error);
            throw error;
        }
    }
    

    public async getAllCategories(): Promise<string[]> {
        try {
            const productRepository = getRepository(Product);
            const categories = await productRepository.createQueryBuilder().select('category').distinct(true).getRawMany();
            return categories.map((category) => category.category);
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }

    public async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const productRepository = getRepository(Product);
            return await productRepository.find({ where: { category } });
        } catch (error) {
            console.error('Error getting products by category:', error);
            throw error;
        }
    }

    public async getProductAverageRating(productId: string, startDate: string, endDate: string): Promise<any> {
        try {
            const productRepository = getRepository(Product);
    
            const product = await productRepository.findOne({ 
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
            const productRepository = getRepository(Product);
    
            const products = await productRepository.find({
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
    
      
}

export default new ProductService();
