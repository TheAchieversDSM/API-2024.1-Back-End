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

    public async getCommentsAgeGenderAndRatingByDate(productId: string, date: Date, state: string): Promise<CommentInfo[]> {
        try {
            const commentRepository = getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comment')
                .select(['comment.age', 'comment.gender', 'comment.rating'])
                .where('comment.product.id = :productId', { productId: Number(productId) })
                .andWhere('comment.date = :date', { date: date })
                .andWhere('comment.state = :state', { state: state })
                .getMany();
    
            const commentsInfo: CommentInfo[] = comments.map(comment => ({
                age: calculateAge(comment.age, date),
                gender: comment.gender,
                rating: comment.rating
            }));
    
            return commentsInfo;
        } catch (error) {
            console.error('Error getting comments by product id, date and state:', error);
            throw error;
        }
    
    function calculateAge(yearOfBirth: number, referenceDate: Date): number {
        const referenceYear = referenceDate.getFullYear();
        return referenceYear - yearOfBirth;
    }
  }
}

export default new CommentService();
