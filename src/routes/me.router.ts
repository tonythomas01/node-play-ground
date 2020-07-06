import express from 'express';
import { authMiddlewareService } from '../services/auth.middleware.service';
import MeRoomsService from '../services/me.rooms.service';

export const meRouter = express.Router();

// /* GET users listing. */
// meRouter.get('/', authMiddlewareService.required, async (req, res, next) => {
//   const userService = new UserService();
//   const users = await userService.ListUsers();
//   return res.json(users);
// });
// userRouter.get('/:userId', authMiddlewareService.required, async (req, res) => {
//   const userService = new UserService();
//   const user = await userService.GetUser(req.params.userId);
//   return res.json(user);
// });

meRouter.post(
  '/rooms/',
  authMiddlewareService.required,
  async (req, res, next) => {
    const meRoomsService = new MeRoomsService();
    const roomCreated = await meRoomsService.createRoom(req.body, req.user);
    return res.json(roomCreated);
  }
);
