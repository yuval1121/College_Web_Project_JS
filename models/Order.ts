import { Schema, Types, model } from 'mongoose';
import Item from '../types/Item';
import { Order } from '../types/Order';
import itemModel from './Item';

const orderSchema = new Schema<Order>({
  items: {
    type: [Types.ObjectId],
    required: true,
    ref: 'item',
  },
  client: {
    type: Types.ObjectId,
    required: true,
    ref: 'user',
  },
  price: {
    type: Number,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre<Order>('save', async function (next) {
  let price = 0;
  for await (const item of this.items) {
    const itemFound: Item | null = await itemModel
      .findById(item)
      .select('price');
    price += itemFound?.price ?? 0;
  }
  this.price = price;
});

const orderModel = model<Order>('order', orderSchema);

export default orderModel;
