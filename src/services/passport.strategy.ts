import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/auth.service'

passport.use(new LocalStrategy(
  (username: string, password: string, done) => {
    const authService = new AuthService();
    return authService.login(username, password, done);
  }
));


