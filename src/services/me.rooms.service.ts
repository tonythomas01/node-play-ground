import { IRoomInputDTO } from '../interfaces/iroom';
import Room from '../models/room';
import User from '../models/user';

export default class MeRoomsService {
  private user: User;

  constructor(user: any) {
    this.user = user;
  }

  public async createRoom(roomInputDTO: IRoomInputDTO) {
    const newRoom: Room = new Room({
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
      'owner_id': this.user.id
    })
  }

  public async serializeRooms(rooms) {
    const userIdsArray: any[string] = [];
    rooms.forEach((element: Room) => {
      userIdsArray.push(element.owner_id);
    });

    const users = await User.find({
      _id: userIdsArray
    });

    return {
      rooms,
      owners: users
    }
  }
}
