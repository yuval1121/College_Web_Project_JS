import { Router } from 'express'
const router: Router = Router();


// @route   GET api/auth
// @desc    Get logged in user
// @access  Private 
router.get('/', (req, res) => {
    res.send("Get logged in user")
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public 
router.post('/', (req, res) => {
    res.send("Log in user")
});

export { router as authRouter };