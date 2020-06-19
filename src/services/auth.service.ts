import { IUserInputDTO } from '../interfaces/iuser';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import User from '../models/user';

export default class AuthService {
  public async signUp(userInputDTO: IUserInputDTO) {
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
    User.findOne({ email: email }, (err, user) => {
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
