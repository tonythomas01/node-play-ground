import User from '../models/user';

export default class MeService {
  private user: User;

  constructor(user: any) {
    this.user = user;
  }

  public async getMe() {
    return User.findById({
      _id: this.user.id
    })
  }
}