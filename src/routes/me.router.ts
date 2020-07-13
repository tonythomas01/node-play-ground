import express from 'express';
import { authMiddlewareService } from '../services/auth.middleware.service';
import MeService from '../services/me.service';

export const meRouter = express.Router();
meRouter.get('/', authMiddlewareService.required, async (req, res, next) => {
  // @ts-ignore
  const meService = new MeService(req.user);
  const meUser = await meService.getMe();
  return res.json(meUser);
});
