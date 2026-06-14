import Registration from '../models/Registration.js';
import Course from '../models/Course.js';
import { exportToExcel } from '../services/excelService.js';

// @desc    Create new registration (enrollment)
// @route   POST /api/registrations
// @access  Private
export const createRegistration = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if there is already a completed registration for this course
    const existingRegistration = await Registration.findOne({
      userId: req.user._id,
      courseId,
      paymentStatus: 'Completed'
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Create a new registration
    const registration = await Registration.create({
      userId: req.user._id,
      courseId,
      paymentStatus: 'Pending'
    });

    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment status
// @route   PUT /api/registrations/:id/payment-status
// @access  Private
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus, transactionId } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: 'Payment status is required' });
    }

    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check ownership or admin status
    if (registration.userId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this registration' });
    }

    registration.paymentStatus = paymentStatus;
    if (transactionId) {
      registration.transactionId = transactionId;
    }

    const updatedRegistration = await registration.save();
    res.json(updatedRegistration);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's registrations
// @route   GET /api/registrations/my-registrations
// @access  Private
export const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id })
      .populate('courseId')
      .sort('-createdAt');
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private/Admin
export const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({})
      .populate('userId', 'name email phone college branch year')
      .populate('courseId', 'title price category')
      .sort('-createdAt');
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

// @desc    Export all registrations to Excel
// @route   GET /api/registrations/export
// @access  Private/Admin
export const exportRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({})
      .populate('userId', 'name email phone college branch year')
      .populate('courseId', 'title price category');

    const workbook = await exportToExcel(registrations);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'Shorelume_Course_Registrations.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
