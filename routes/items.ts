import { Router } from 'express';
import { authAdmin, authUser } from '../middleware/auth';
import itemModel from '../models/Item';
const itemsRouter: Router = Router();

// @route   GET api/items
// @desc    Get all items on menu.
// @access  Public
itemsRouter.get('/', async (req, res) => {
  try {
    const items = await itemModel.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET api/items/:name
// @desc    Get all items on menu.
// @access  Public
itemsRouter.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const items = await itemModel.find({ name });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
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
