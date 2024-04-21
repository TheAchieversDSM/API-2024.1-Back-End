import { Request, Response } from 'express';
import { UserService } from '../services/index';
import jwt from 'jsonwebtoken';

class UserController {
    public async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user = await UserService.validateUser(email, password);
        if (!user) {
          res.status(400).json({ error: 'Invalid email or password' });
          return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token });
    }
    
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          res.status(400).json({ error: 'Name, email, and password are required' });
          return;
        }
        const existingUser = await UserService.findByEmail(email);
        if (existingUser) {
          res.status(400).json({ error: 'Email already exists' });
          return;
        }
        const newUser = await UserService.createUser(name, email, password);
        res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
    }
}

export default new UserController();
