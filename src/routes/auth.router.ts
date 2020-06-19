import express from 'express';
import passport from 'passport';
import * as auth from './auth';

export const authRouter = express.Router();

/* GET users listing. */
authRouter.post(
  '/login', auth.optional, (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }
      return res.status(400).json({
        errors: info
      });
    })(req, res, next);
  });
