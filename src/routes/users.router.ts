import express from 'express';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export const userRouter = express.Router();
import {authMiddlewareService} from '../services/auth.middleware.service';

/* GET users listing. */
userRouter.get('/',  authMiddlewareService.required, async (req, res, next) => {
  const userService = new UserService();
  const users = await userService.ListUsers();
  return res.json(users);
});
userRouter.get('/:userId', authMiddlewareService.required, async (req, res) => {
  const userService = new UserService();
  const user = await userService.GetUser(req.params.userId);
  return res.json(user);
});

userRouter.post('/', async (req, res, next) => {
  const authService = new AuthService();
  const userCreated = await authService.signUp(req.body);
  return res.json(userCreated);
});
