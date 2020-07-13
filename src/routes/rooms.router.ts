import express from 'express';
import { authMiddlewareService } from '../services/auth.middleware.service';
import MeService from '../services/me.service';
import RoomsService from '../services/rooms.service';

export const roomsRouter = express.Router();
roomsRouter.get('/', authMiddlewareService.optional, async (req, res, next) => {
  const roomsService = new RoomsService();
  const publicRooms = await roomsService.getRooms();
  const roomsResponse = await roomsService.serializeRooms(publicRooms);
  return res.json(roomsResponse);
});
