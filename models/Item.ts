import { Schema, model } from 'mongoose';
import Item from '../types/Item';

const itemSchema: Schema = new Schema<Item>({
  name: {
    type: String,
    required: true,
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
    type: Date,
    default: null,
  },
});

const itemModel = model<Item>('item', itemSchema);

export default itemModel;
