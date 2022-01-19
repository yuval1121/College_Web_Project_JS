import { Request, Response, Router } from 'express';
import { authBarista, authUser } from '../middleware/auth';

const ordersRouter: Router = Router();

// @route   POST api/orders/makeorder
// @desc    Client makes an order.
// @access  Public - Client
ordersRouter.post('/makeorder', authUser, (req: Request, res: Response) => {
  const { order } = req.body;
});

// @route   POST api/orders/takeorder
// @desc    Barista approves order.
// @access  Public - Barista
ordersRouter.put(
  '/takeorder',
  authUser,
  authBarista,
  (req: Request, res: Response) => {
    const { order } = req.body;
  }
);

export { ordersRouter };
