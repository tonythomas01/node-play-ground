import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/auth.service';
import User from '../models/user';

passport.use(
  new LocalStrategy({ usernameField: 'email'},
    async (email: string, password: string, done) => {
    const authService = new AuthService();
    return authService.login(email, password, done);
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});