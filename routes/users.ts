import User from '../types/User';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router: Router = Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
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
      type,
    }: { name: string; email: string; password: string; type: string } =
      req.body;

    try {
      let user = await UserModel.findOne({ email });

      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      user = new UserModel<User>({
        name,
        email,
        password,
        type,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.send('User saved');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

export { router as usersRouter };
