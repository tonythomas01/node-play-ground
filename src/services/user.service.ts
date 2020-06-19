import User from '../models/user';

export default class UserService {
  public async ListUsers() {
    return User.find();
  }

  public async GetUser(userId: string) {
    return User.findById(userId)
  }
}