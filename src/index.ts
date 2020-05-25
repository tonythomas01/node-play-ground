import express from 'express';
import cors from 'cors';
import { indexRouter } from './routes/index.router';
import { userRouter } from './routes/users.router';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import createError from 'http-errors';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('App listening on port 3000!');
});
