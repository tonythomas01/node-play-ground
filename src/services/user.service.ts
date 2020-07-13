import User from '../models/user';
import { IUser } from '../interfaces/iuser';

export default class UserService {
  public async listUsers(): Promise<IUser[]> {
    return User.find();
  }

  public async getUser(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }
}
