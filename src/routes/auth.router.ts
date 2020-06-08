import express from 'express';
import passport from 'passport';

export const authRouter = express.Router();

/* GET users listing. */
authRouter.post(
  '/login',
  passport.authenticate('local'),
  (req, res, next) => {
  const user: any = req.user;
  res.send(`User authenticated as  ${user.username}`);
});
