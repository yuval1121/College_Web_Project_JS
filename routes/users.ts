import User from '../types/User';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const usersRouter: Router = Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
usersRouter.post(
  '/',
  body('name', 'Please add name').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      role,
    }: { name: string; email: string; password: string; role: string } =
      req.body;

    try {
      let user = await UserModel.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new UserModel<User>({
        name,
        email,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(payload, config.get('jwt'), {}, (err, token) => {
        if (err) throw new Error();
        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

export { usersRouter };
