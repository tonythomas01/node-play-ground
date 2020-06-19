import mongoose from 'mongoose';
import { IUser } from '../interfaces/iuser';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

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

User.methods.setPassword = async function (password: string) {
  const salt = randomBytes(32);
  this.password = await argon2.hash(password, { salt });
  this.salt = salt.toString('hex');
};
User.methods.comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const pass = Buffer.from(password);
  try {
    return await argon2.verify(hashedPassword, pass);
  } catch (e) {
    return false;
  }
};
User.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 10);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(String(expirationDate.getTime() / 1000), 10),
    },
    'secret'
  );
};
User.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};
export default mongoose.model<IUser & mongoose.Document>('User', User);
