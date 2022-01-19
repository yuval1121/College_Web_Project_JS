import { Schema, model, Types } from 'mongoose';
import User from '../types/User';

const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'client',
  },
  table: {
    type: Types.ObjectId,
    ref: 'table',
  },
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
