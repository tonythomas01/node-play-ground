import express from 'express';
import passport from 'passport';
import { authMiddlewareService } from '../services/auth.middleware.service';

export const authRouter = express.Router();

/* GET users listing. */
authRouter.post('/login', authMiddlewareService.optional, (req, res, next) => {
  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }
      return res.status(400).json({
        errors: info,
      });
    }
  )(req, res, next);
});
