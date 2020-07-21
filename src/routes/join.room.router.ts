import express from 'express';
import { authMiddlewareService } from '../services/auth.middleware.service';
import JoinroomService from '../services/join.room.service';

export const joinRoomRouter = express.Router();

joinRoomRouter.post(
  '/',
  authMiddlewareService.required,
  async (req, res, next) => {
      const joinRoomService = new JoinroomService(req.user);
      try {
        const room = await joinRoomService.joinRoom(req.body);
      } catch (e) {
        next(e)
      }
      const roomsResponse = await joinRoomService.serializeRooms([room]);
      return res.json(roomsResponse);
  }
);
