import Room from '../models/room';
import User from '../models/user';
import { IRoom } from '../interfaces/iroom';

export default class RoomsService {
  public async getRooms(): Promise<IRoom[]> {
    return Room.find();
  }

  public async serializeRooms(rooms: IRoom[]) {
    const userIdsArray: any[string] = [];
    rooms.forEach((element: IRoom) => {
      userIdsArray.push(element.owner_id);
    });

    const users = await User.find({
      _id: userIdsArray,
    });

    return {
      rooms,
      owners: users,
    };
  }
}
