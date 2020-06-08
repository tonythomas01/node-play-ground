import { IUserInputDTO } from '../interfaces/iuser';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import User from '../models/user';

export default class AuthService {
  public async signUp(userInputDTO: IUserInputDTO) {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
    const newUser = new User({
      ...userInputDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });
    try{
      await newUser.save();
    } catch (e) {
      return e
    }
    return newUser;
  }

  login(username: string, password: string, done: any) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
}
