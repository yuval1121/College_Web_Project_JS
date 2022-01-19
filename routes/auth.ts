import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';

const authRouter: Router = Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
authRouter.get('/', auth, async (req, res) => {
  try {
    //@ts-ignore
    const user = await UserModel.findById(res.locals.user.id).select(
      '-password'
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
authRouter.post(
  '/',
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password }: { email: string; password: string } = req.body;
    try {
      let user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

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
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

export { authRouter };
