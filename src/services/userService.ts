import { Repository } from "typeorm";
import { User } from "../models/user";
import { DataBaseSource } from "../config/database";

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = DataBaseSource.getRepository(User);
  }

  public async createUser(name: string, email: string, password: string): Promise<User> {
    const newUser = this.userRepository.create({ name, email, password });
    await this.userRepository.save(newUser);
    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined;
  }

  public async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }
}
export const userServiceInstance = new UserService();
