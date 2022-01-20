import { Router } from 'express';
import { authAdmin, authUser } from '../middleware/auth';
import itemModel from '../models/Item';
import Item from '../types/Item';
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

// @route   GET api/items/:id
// @desc    Get items on menu.
// @access  Public
itemsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemModel.findById(id);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Add new item.
// @access  Admin
itemsRouter.post('/', authUser, authAdmin, async (req, res) => {
  const { name, price, alcoholic, time }: Item = req.body;

  try {
    const newItem = new itemModel<Item>({
      name,
      price,
      alcoholic,
      time,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
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
