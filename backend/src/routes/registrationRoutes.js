import express from 'express';
import { 
  createRegistration, 
  updatePaymentStatus, 
  getMyRegistrations, 
  getAllRegistrations, 
  exportRegistrations 
} from '../controllers/registrationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// User protected routes
router.post('/', protect, createRegistration);
router.put('/:id/payment-status', protect, updatePaymentStatus);
router.get('/my-registrations', protect, getMyRegistrations);

// Admin protected routes
router.get('/', protect, admin, getAllRegistrations);
router.get('/export', protect, admin, exportRegistrations);

export default router;
