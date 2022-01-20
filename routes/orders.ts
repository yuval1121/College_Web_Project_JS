import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
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
  body('items').notEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // can use spread instead
    const { items, price, done }: Order = req.body;
    const client = res.locals.user.id;
    try {
      const order = new orderModel<Order>({
        items,
        client,
        price,
        done,
      });

      await order.save();
      res.json(order);
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
      const order = await orderModel.findByIdAndUpdate(orderID, { done: true });
      res.status(200).json(order);
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

export { ordersRouter };
