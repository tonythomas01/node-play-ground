import {IUser} from '../interfaces/iuser';
import User from '../models/user'

export default class MeService {
  private user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  public async getMe(): Promise<IUser| null> {
    return User.findById({
      _id: this.user.id,
    });
  }
}
