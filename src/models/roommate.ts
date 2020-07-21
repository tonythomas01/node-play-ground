import * as mongoose from 'mongoose';
import { IRoomMate } from '../interfaces/iroommate';

const RoomMate = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
export default mongoose.model<IRoomMate>('RoomMate', RoomMate);
