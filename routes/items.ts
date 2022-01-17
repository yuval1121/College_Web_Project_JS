import { Router } from 'express'
const router: Router = Router();


// @route   GET api/items
// @desc    Get all items on menu.
// @access  Public 
router.get('/', (req, res) => {
    res.send("Get all items")
});


// @route   POST api/items
// @desc    Add new contact.
// @access  Private 
router.post('/', (req, res) => {
    res.send("Add item")
});

// @route   PUT api/items/:id
// @desc    Update item.
// @access  Private 
router.put('/:id', (req, res) => {
    res.send("Update item")
});

// @route   PUT api/items/:id
// @desc    Delete item.
// @access  Private 
router.delete('/:id', (req, res) => {
    res.send("Delete item")
});



export { router as itemsRouter };