import { Schema, Types, model } from 'mongoose';
import Seat from '../types/Seat';

const seatSchema: Schema = new Schema<Seat>({
  clients: [{ type: Types.ObjectId, ref: 'user' }],
  size: Number,
  number: Number,
});

const seatModel = model<Seat>('seat', seatSchema);

export default seatModel;
