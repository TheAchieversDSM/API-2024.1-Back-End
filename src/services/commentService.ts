import { getRepository } from 'typeorm';
import { Comment } from '../models';

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

}

export default new CommentService();
