import { IUser } from '../interfaces/iuser';
import User from '../models/user';

export default class AuthService {
  public async signUp(userInputDTO: IUser) {
    const newUser = new User({
      ...userInputDTO,
    });
    // @ts-ignore
    await newUser.setPassword(userInputDTO.password);
    try {
      await newUser.save();
    } catch (e) {
      return e;
    }
    return newUser;
  }
  public async login(email: string, password: string, done: any) {
    User.findOne({ email }, (err, user: IUser | null) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // @ts-ignore
      user.comparePassword(password, user.password).then((result) => {
        if (!result) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
  }
}
