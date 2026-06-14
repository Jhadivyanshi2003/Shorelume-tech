import express from 'express';
import { registerUser, loginUser, getMe, exportUsers } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/export', protect, admin, exportUsers);

export default router;
