
import { getRepository } from 'typeorm';
import { Product } from '../models/index'; 

class ProductService {
    public async checkAndSaveProduct(productId: string, productName: string, siteCategoryLv1: string, siteCategoryLv2: string): Promise<void> {
        try {
            const productRepository = getRepository(Product);
            const existingProduct = await productRepository.findOne({ where: { name: productName } });

            if (existingProduct) {
                return;
            } else {
                const newProduct = new Product();
                newProduct.name = productName;
                newProduct.category = siteCategoryLv1;
                newProduct.subcategory = siteCategoryLv2;
                await productRepository.save(newProduct);
            }
        } catch (error) {
            console.error('Error checking and saving product:', error);
            throw error; 
        }
    }
}

export default new ProductService();
