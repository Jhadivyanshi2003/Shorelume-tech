import express from 'express';
import { 
  applyForInternship, 
  getMyApplications, 
  getAllApplications, 
  updateApplicationStatus,
  exportApplications
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, upload.single('resume'), applyForInternship);
router.get('/my-applications', protect, getMyApplications);

// Admin routes
router.get('/export', protect, admin, exportApplications);
router.get('/', protect, admin, getAllApplications);
router.put('/:id/status', protect, admin, updateApplicationStatus);

export default router;
