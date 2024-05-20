import { DataBaseSource } from '../config/database';
import { Comment } from '../models/comment';

export const taskRepository = DataBaseSource.getRepository(Comment);