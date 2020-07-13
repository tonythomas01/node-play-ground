import express from 'express';
import cors from 'cors';
import { indexRouter } from './routes/index.router';
import { userRouter } from './routes/users.router';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import connectDB from '../config/dbConnection';
import createError from 'http-errors';
import { authRouter } from './routes/auth.router';

import './services/passport.strategy';
import { meRouter } from './routes/me.router';
import { meRoomsRouter } from './routes/me.rooms.router';
import { roomsRouter } from './routes/rooms.router';

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

connectDB();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users/', userRouter);
app.use('/auth/', authRouter);
app.use('/me/rooms/', meRoomsRouter);
app.use('/rooms/', roomsRouter);
app.use('/me/', meRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('App listening on port 3000!');
});
