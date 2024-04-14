import { In, OneToMany, getRepository } from 'typeorm';
import PlnApi from '../config/plnApi';
import { Comment } from '../models';
import { CategorySummary } from '../models/categorySummary';
import FormData from 'form-data'; // Importe a biblioteca FormData

class CategorySummaryService {
   public async summarizeByCategory(categories: string[], comments: Object[], limit: number): Promise<CategorySummary[]> {
      try {
         const response = await PlnApi.post(`/pln/hotTopics/${categories}`, comments, { params: { limit } });
         const data = response.data;

         const summarizedCategories = await Promise.all(Object.keys(data).map(async (category) => {
            if (data[category].length === 0) return null;

            const summaries = await Promise.all(data[category].map(async (element: any) => {
               const categorySummary = new CategorySummary();
               categorySummary.category = category;
               categorySummary.text = Object.keys(element)[0];
               categorySummary.amount = element[categorySummary.text];
               return categorySummary;
            }));

            return summaries;
         }));


         const flattenedSummaries = summarizedCategories.flat().filter((summary) => summary !== null);
         const categorySummaryRepository = getRepository(CategorySummary);
         await categorySummaryRepository.save(flattenedSummaries);

         return flattenedSummaries;
      } catch (error) {
         console.error('Error summarizing categories:', error);
         throw error;
      }
   }

   public async getAllSumariesByCategory(categories: string[]): Promise<CategorySummary[]> {
      try {
         const categorySummaryRepository = getRepository(CategorySummary);
         return await categorySummaryRepository.find({ where: { category: In(categories) } });
      } catch (error) {
         console.error('Error getting all summaries by category:', error);
         throw error;
      }
   }


}

export default new CategorySummaryService();
