import { Document } from 'mongoose';
import { IUser } from './iuser';

export interface IRoom extends Document {
  name: string;
  address: {
    title: string;
    placeId: string;
    location: {
      type: string;
      coordinates: [number];
    };
  };
  isPublic: boolean;
  code: number;
  owner_id: IUser['_id'];
}
export interface IRoomInputDTO {
  name: IRoom['name'];
  address: IRoom['address'];
  isPublic: IRoom['isPublic'];
}
