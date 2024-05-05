import { Repository } from 'typeorm';
import { Comment } from '../models';
import { DataBaseSource } from '../config/database';

class CommentService {
    private commentRepository: Repository<Comment>;

    constructor() {
        this.commentRepository = DataBaseSource.getRepository(Comment);
    }

    public async createComment(comment: Comment): Promise<Comment> {
        try {
            return await this.commentRepository.save(comment);
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    public async getComments(): Promise<Comment[]> {
        try {
            return await this.commentRepository.find();
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    public async getCommentsByProductId(productId: string): Promise<Comment[]> {
        try {
            return await this.commentRepository.find({ where: { product: { id: Number(productId) } } });
        } catch (error) {
            console.error('Error getting comment by product id:', error);
            throw error;
        }
    }
}

export default new CommentService();
