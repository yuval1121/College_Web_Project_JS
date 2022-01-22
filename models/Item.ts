import { Schema, model } from 'mongoose';
import Item from '../types/Item';

const itemSchema: Schema = new Schema<Item>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  alcoholic: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: null,
  },
});

const itemModel = model<Item>('item', itemSchema);

export default itemModel;
