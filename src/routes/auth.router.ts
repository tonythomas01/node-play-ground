import express from 'express';
import passport from 'passport';

export const authRouter = express.Router();

/* GET users listing. */
authRouter.post('/login',
  passport.authenticate('local', {session:false}),
  (req, res, next) => {
    return res.json(req.user);
  }
);
