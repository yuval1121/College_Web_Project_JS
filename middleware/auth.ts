import jwt from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';

export function authUser(req: Request, res: Response, next: NextFunction) {
  //get token from header
  const token = req.header('x-auth-token');

  //check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwt'));
    //@ts-ignore
    res.locals.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

export async function authAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = res.locals.user;
  try {
    let user = await UserModel.findById(id);

    if (user?.role === 'admin') {
      return next();
    }

    return res.status(403).json({ msg: 'Admin permission required' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

export async function authBarista(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = res.locals.user;
  try {
    let user = await UserModel.findById(id);

    if (user?.role === 'barista') {
      return next();
    }

    return res.status(403).json({ msg: 'Barista permission required' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}
