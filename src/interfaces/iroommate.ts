import { Document } from 'mongoose';
import { IUser } from './iuser';
import { IRoom } from './iroom';

export interface IRoomMate extends Document {
  user_id: IUser['_id'];
  room_id: IRoom['_id'];
}
