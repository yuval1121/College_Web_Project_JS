import { Schema, Types, model } from 'mongoose';
import Item from '../types/Item';
import { Order } from '../types/Order';
import User from '../types/User';
import itemModel from './Item';
import UserModel from './User';

const orderSchema = new Schema<Order>({
  items: {
    type: [Types.ObjectId],
    ref: 'item',
    validate: {
      validator: function (arr: [Types.ObjectId]) {
        return arr.length > 0;
      },
    },
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
  const client: User | null = await UserModel.findById(this.client).select('');
  let price = 0;
  for await (const item of this.items) {
    const itemFound: Item | null = await itemModel
      .findById(item)
      .select('price');
    price += itemFound?.price ?? 0;
  }
  if (client?.role === 'client-vip') {
    this.price = price * 0.9;
  } else this.price = price;
  next();
});

const orderModel = model<Order>('order', orderSchema);

export default orderModel;
