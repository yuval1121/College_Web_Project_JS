import { Types } from 'mongoose';

export default interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  table: Types.ObjectId;
}
