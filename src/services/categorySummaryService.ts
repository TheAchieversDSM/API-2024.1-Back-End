import { getRepository } from 'typeorm';
import PlnApi from '../config/plnApi';
import { Comment } from '../models';
import { CategorySummary } from '../models/categorySummary';


class CategorySummaryService {
   public async summarizeByCategory(categories: string[], csv: any, limit: number): Promise<CategorySummary[]> {
      try {
        const stringCategories = categories.join(',');
         console.log('stringCategories:', stringCategories);
         console.log('csv:', csv);
         
      let formData = new FormData();
      formData.append('csv', csv);
 
        const response = await PlnApi.post(`/pln/hot_topics/Brinquedos`, formData, {params: {limit}});
        
        const data = response.data;
        const summarizedCategories: CategorySummary[] = [];
        Object.keys(data).forEach(async (key) => {
            const categorySummary = new CategorySummary();
            categorySummary.category = key;
            Object.keys(data[key]).forEach((innerKey) => {
                categorySummary.text = innerKey;
                categorySummary.amount = data[key][innerKey];
            });
            summarizedCategories.push(categorySummary);
         
            await getRepository(CategorySummary).save(categorySummary);
        });

        return summarizedCategories;
      } catch (error) {
         console.error('Error summarizing categories:', error);
         throw error;
      }
   }

}

export default new CategorySummaryService();
