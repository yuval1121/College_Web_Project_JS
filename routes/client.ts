import { Request, Response, Router } from 'express';
import { authUser } from '../middleware/auth';

const clientRouter: Router = Router();

// @route   POST api/makeorder
// @desc    Client makes an order.
// @access  Public
clientRouter.post('/makeorder', authUser, (req: Request, res: Response) => {
  const { order } = req.body;
});
