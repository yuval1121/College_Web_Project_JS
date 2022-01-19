import { Router } from 'express';
import { authAdmin, authUser } from '../middleware/auth';
const itemsRouter: Router = Router();

// @route   GET api/items
// @desc    Get all items on menu.
// @access  Public
itemsRouter.get('/', (req, res) => {
  res.send('Get all items');
});

// @route   POST api/items
// @desc    Add new item.
// @access  Admin
itemsRouter.post('/', authUser, authAdmin, (req, res) => {
  res.send('Add item');
});

// @route   PUT api/items/:id
// @desc    Update item.
// @access  Admin
itemsRouter.put('/:id', authUser, authAdmin, (req, res) => {
  res.send('Update item');
});

// @route   PUT api/items/:id
// @desc    Delete item.
// @access  Admin
itemsRouter.delete('/:id', authUser, authAdmin, (req, res) => {
  res.send('Delete item');
});

export { itemsRouter };
