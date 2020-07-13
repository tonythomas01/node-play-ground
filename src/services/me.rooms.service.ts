import { IRoom } from '../interfaces/iroom';
import Room from '../models/room';
import RoomsService from './rooms.service';
import { IUser } from '../interfaces/iuser';

export default class MeRoomsService extends RoomsService{
  private user: IUser;

  constructor(user: any) {
    super();
    this.user = user;
  }

  public async createRoom(roomInputDTO: IRoom) {
    const newRoom: IRoom = new Room({
      ...roomInputDTO,
      owner_id: this.user.id,
    });
    await newRoom.generateCode();
    try {
      await newRoom.save();
    } catch (e) {
      return e;
    }
    return newRoom;
  }

  public async getMeRooms() {
    return Room.find({
      owner_id: this.user.id,
    });
  }
}
