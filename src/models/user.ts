import mongoose from 'mongoose';
import { IUser } from '../interfaces/iuser';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.salt;
        delete ret.updatedAt;
        delete ret.password;
        return ret;
      },
    },
  }
);
export default mongoose.model<IUser & mongoose.Document>('User', User);
