import { getRepository } from 'typeorm';
import { Comment } from '../models';
import CommentInfo from '../interfaces/CommentInfo';

class CommentService {
    public async createComment(comment: Comment): Promise<Comment> {
        try {
            const commentRepository = getRepository(Comment);
            return await commentRepository.save(comment);
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    public async getComments(): Promise<Comment[]> {
        try {
            const commentRepository = getRepository(Comment);
            return await commentRepository.find();
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    public async getCommentsByProductId(productId: string): Promise<Comment[]> {
        try {
            const commentRepository = getRepository(Comment);
            return await commentRepository.find({ where: { product: { id: Number(productId) } } });
        } catch (error) {
            console.error('Error getting comment by product id:', error);
            throw error;
        }
    }

    public async getCommentsAgeGenderAndRatingByDate(
        productId: string, 
        startDate: string = '2000-01-01',
        endDate: string = '3099-12-31', 
        state: string): 
        Promise<CommentInfo[]> {
        try {
            const commentRepository = getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comment')
                .select(['comment.age', 'comment.gender', 'comment.rating'])
                .where('comment.product.id = :productId', { productId: productId })
                .andWhere('comment.date >= :startDate AND comment.date <= :endDate', { startDate, endDate })
                .andWhere('comment.state = :state', { state: state })
                .getMany();
    
            const commentsInfo: CommentInfo[] = comments.map(comment => ({
                age: this.calculateAge(comment.age, new Date(endDate)), // Usando endDate como referência para calcular a idade
                gender: comment.gender,
                rating: comment.rating
            }));
    
            return commentsInfo;
        } catch (error) {
            console.error('Error getting comments by product id, date range, and state:', error);
            throw error;
        }
    }
    
    private calculateAge(yearOfBirth: number, referenceDate: Date): number {
        const referenceYear = referenceDate.getFullYear();
        return referenceYear - yearOfBirth;
    }
}

export default new CommentService();
