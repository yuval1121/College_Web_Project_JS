import { Request, Response, Router } from 'express';

const clientRouter: Router = Router();

// @route   POST api/makeorder
// @desc    Client makes an order.
// @access  Public
clientRouter.post('/makeorder', (req: Request, res: Response) => {
  const { order } = req.body;
});
