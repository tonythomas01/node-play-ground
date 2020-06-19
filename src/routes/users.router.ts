import express from 'express';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', async (req, res, next) => {
  const userService = new UserService();
  const users = await userService.ListUsers();
  return res.json(users);
});
userRouter.get('/:userId', async (req, res) => {
  const userService = new UserService();
  const user = await userService.GetUser(req.params.userId);
  return res.json(user);
});

userRouter.post('/', async (req, res, next) => {
  const authService = new AuthService();
  const userCreated = await authService.signUp(req.body);
  return res.json(userCreated);
});
