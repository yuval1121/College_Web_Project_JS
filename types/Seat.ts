import { Types } from 'mongoose';

export default interface Seat {
  clients: [Types.ObjectId];
  size: Number;
  number: Number;
}
