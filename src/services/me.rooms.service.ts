import { IRoomInputDTO } from '../interfaces/iroom';
import Room from '../models/room';
import User from '../models/user';

export default class MeRoomsService {
  public async createRoom(roomInputDTO: IRoomInputDTO, createdBy: User) {
    const newRoom = new Room({
      ...roomInputDTO,
      owner: createdBy.id,
    });
    await newRoom.generateCode();
    try {
      await newRoom.save();
    } catch (e) {
      return e;
    }
    return newRoom;
  }
}
