import mongoose from 'mongoose';
import { IRoom } from '../interfaces/iroom';

const AddressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: false,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Room = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a room name'],
    },
    address: AddressSchema,
    isPublic: {
      type: Boolean,
      default: true,
    },
    code: {
      type: Number,
      unique: true,
      index: true,
      maxlength: 4,
      minlength: 4,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);
Room.methods.generateCode = async function f() {
  this.code = Math.floor(Math.random() * 9000 + 1000);
};
export default mongoose.model<IRoom & mongoose.Document>('Room', Room);
