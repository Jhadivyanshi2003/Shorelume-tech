import express from 'express';
import { 
  getInternships, 
  getInternshipById, 
  createInternship, 
  updateInternship, 
  deleteInternship 
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getInternships);
router.get('/:id', getInternshipById);

// Admin routes
router.post('/', protect, admin, createInternship);
router.put('/:id', protect, admin, updateInternship);
router.delete('/:id', protect, admin, deleteInternship);

export default router;
