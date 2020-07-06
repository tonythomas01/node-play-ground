import express from 'express';
import { authMiddlewareService } from '../services/auth.middleware.service';
import MeRoomsService from '../services/me.rooms.service';

export const meRoomsRouter = express.Router();

meRoomsRouter.post(
  '/',
  authMiddlewareService.required,
  async (req, res, next) => {
    const meRoomsService = new MeRoomsService(req.user);
    await meRoomsService.createRoom(req.body);
    const meRooms = await meRoomsService.getMeRooms();
    const meRoomsResponse = await meRoomsService.serializeRooms(meRooms);
    return res.json(meRoomsResponse);
  }
);

meRoomsRouter.get(
  '/',
  authMiddlewareService.required,
  async (req, res, next) => {
    const meRoomsService = new MeRoomsService(req.user);
    const meRooms = await meRoomsService.getMeRooms();
    const meRoomsResponse = await meRoomsService.serializeRooms(meRooms);
    return res.json(meRoomsResponse);
  }
);
