import { In, OneToMany, getRepository } from 'typeorm';
import PlnApi from '../config/plnApi';
import { Comment } from '../models';
import { CategorySummary } from '../models/categorySummary';
import FormData from 'form-data'; // Importe a biblioteca FormData

class CategorySummaryService {
   public async summarizeByCategory(categories: string[], comments: Object[], limit: number): Promise<CategorySummary[]> {
      try {
         const categorySummaryRepository = getRepository(CategorySummary);
         const responseTags = await PlnApi.post(`/pln/hotTopics/${categories}`, comments, { params: { limit } });
         const dataTags = responseTags.data;

         const summarizedCategoriesTags = await Promise.all(Object.keys(dataTags).map(async (category) => {
            if (dataTags[category].length === 0) return null;

            const summariesTags = await Promise.all(dataTags[category].map(async (element: any) => {
               const categorySummary = new CategorySummary();
               categorySummary.type = 'tag'
               categorySummary.category = category;
               categorySummary.text = Object.keys(element)[0];
               categorySummary.amount = element[categorySummary.text];
               return categorySummary;
            }));

            return summariesTags;
         }));


         const flattenedSummariesTags = summarizedCategoriesTags.flat().filter((summary) => summary !== null);
         await categorySummaryRepository.save(flattenedSummariesTags);

         const responseComments = await PlnApi.post(`/pln/mostComments/${categories}`, comments, { params: { limit } });
         const dataComments = responseComments.data;

         const summarizedCategoriesComments = await Promise.all(Object.keys(dataComments).map(async (category) => {
            if (dataComments[category].length === 0) return null;

            const summariesComments = await Promise.all(dataComments[category].map(async (element: any) => {
               const categorySummary = new CategorySummary();
               categorySummary.type = 'comment'
               categorySummary.category = category;
               categorySummary.text = Object.keys(element)[0];
               categorySummary.amount = element[categorySummary.text];
               return categorySummary;
            }));

            return summariesComments;
         }));


         const flattenedSummariesComments = summarizedCategoriesComments.flat().filter((summary) => summary !== null);
      
         await categorySummaryRepository.save(flattenedSummariesComments);

         return [...flattenedSummariesTags, ...flattenedSummariesComments];

         
      } catch (error) {
         console.error('Error summarizing categories:', error);
         throw error;
      }
   }

   public async getAllSumariesByCategory(categories: string[], type: string): Promise<CategorySummary[]> {
      try {
         const categorySummaryRepository = getRepository(CategorySummary);
         return await categorySummaryRepository.find({ where: { category: In(categories), type: type } });
      } catch (error) {
         console.error('Error getting all summaries by category:', error);
         throw error;
      }
   }


}

export default new CategorySummaryService();
