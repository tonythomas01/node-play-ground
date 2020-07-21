import Room from '../models/room';
import { IRoom } from '../interfaces/iroom';
import UserRoomService from './user.room.service';
import { IRoomMate } from '../interfaces/iroommate';
import RoomMate from '../models/roommate';

export default class JoinRoomService extends UserRoomService {
  constructor(props: any) {
    super(props);
  }
  async updateRoomMatesCount(room: Room) {
    room.roomMatesCount = room.roomMatesCount ? room.roomMatesCount + 1 : 1;
    room.save();
    return room;
  }

  async joinRoom(body: any) {
    const joinCode = body.code;
    const room: IRoom | null = await Room.findOne({
      code: joinCode,
    });
    if (!room) {
      throw new Error('Room not found!');
    }
    // Join the room ?
    const roomMate: IRoomMate = new RoomMate({
      user_id: this.user.id,
      room_id: room.id,
    });
    await roomMate.save();
    const updatedRoom = await this.updateRoomMatesCount(room);
    return updatedRoom;
  }
}
