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
    try {
      await newUser.save();
    } catch (e) {
      return e;
    }
    return newUser;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const pass = Buffer.from(password);
    try {
      return await argon2.verify(hashedPassword, pass);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return false;
    }
  }

  public async login(email: string, password: string, done: any) {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      this.comparePassword(password, user.password).then((result) => {
        if (!result) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
  }
}
