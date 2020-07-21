import RoomsService from './rooms.service';
import { IUser } from '../interfaces/iuser';

export default class UserRoomService  extends RoomsService {
  protected user: IUser;

  constructor(user: any) {
    super();
    this.user = user;
  }
}