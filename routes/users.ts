import { Router } from 'express'
const router: Router = Router();


// @route   POST api/users
// @desc    Register a user
// @access  Public 
router.post('/', (req, res) => {
    res.send("Register a user")
});

export { router as usersRouter };