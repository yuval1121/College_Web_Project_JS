import { Request, Response, Router } from 'express';
import { authBarista, authUser } from '../middleware/auth';
import orderModel from '../models/Order';
import { Order } from '../types/Order';

const ordersRouter: Router = Router();

// @route   POST api/orders/makeorder
// @desc    Client makes an order.
// @access  Public - Client
ordersRouter.post(
  '/makeorder',
  authUser,
  async (req: Request, res: Response) => {
    // can use spread instead
    const { items, client, price, done }: Order = req.body;
    try {
      const order = new orderModel<Order>({
        items,
        client,
        price,
        done,
      });

      await order.save();
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/orders/takeorder/:orderID
// @desc    Barista approves order.
// @access  Public - Barista
ordersRouter.put(
  '/takeorder/:orderID',
  authUser,
  authBarista,
  async (req: Request, res: Response) => {
    try {
      const orderID: string = req.params.orderID;
      await orderModel.findByIdAndUpdate(orderID, { done: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

export { ordersRouter };
