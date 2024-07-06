import express from 'express';
import { signup, login } from '../controller/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protect routes that require authentication
router.get('/protected-route', protect, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;