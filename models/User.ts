import { Schema, model } from 'mongoose';
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
  type: {
    type: String,
    required: true,
    default: 'client',
  },
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
