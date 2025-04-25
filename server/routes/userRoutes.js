const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);
router.get('/verify', authMiddleware, (req, res) => {
    res.status(200).json({ valid: true });
});

module.exports = router;