import express from 'express';
export const userRouter = express.Router();
import passport from 'passport';
import AuthService from '../services/auth.service';
import { IUser, IUserInputDTO } from '../interfaces/iuser';
import * as mongoose from 'mongoose';

/* GET users listing. */
userRouter.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

userRouter.post(
  '/',
  (req, res, next) => {
    const authService = new AuthService();
    let userCreated: Promise<IUser & mongoose.Document>;
    userCreated = authService.signUp(req.body);
    userCreated.then(value => {
      res.json(value);
    });
  }
);