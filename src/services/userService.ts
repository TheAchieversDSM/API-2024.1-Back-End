import { User } from "../models/index";

class UserService {
  private users: User[] = [];

  public async createUser(name: string, email: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.id = this.users.length + 1;
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    this.users.push(newUser);
    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }
}

export default new UserService();
