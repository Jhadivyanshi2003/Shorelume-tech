import Internship from '../models/Internship.js';
import InternshipApplication from '../models/InternshipApplication.js';
import User from '../models/User.js';
import { appendInternshipToExcelFile, exportInternshipApplicationsToExcel, updateInternshipStatusInExcelFile } from '../services/excelService.js';

// ==========================================
// INTERNSHIPS CRUD (Public & Admin)
// ==========================================

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({}).sort('-createdAt');
    res.json(internships);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new internship position
// @route   POST /api/internships
// @access  Private/Admin
export const createInternship = async (req, res, next) => {
  try {
    const { title, description, duration, requirements, type } = req.body;

    if (!title || !description || !duration || !type) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const internship = await Internship.create({
      title,
      description,
      duration,
      requirements: requirements || [],
      type
    });

    res.status(201).json(internship);
  } catch (error) {
    next(error);
  }
};

// @desc    Update internship position
// @route   PUT /api/internships/:id
// @access  Private/Admin
export const updateInternship = async (req, res, next) => {
  try {
    const { title, description, duration, requirements, type } = req.body;

    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    internship.title = title || internship.title;
    internship.description = description || internship.description;
    internship.duration = duration || internship.duration;
    internship.requirements = requirements || internship.requirements;
    internship.type = type || internship.type;

    const updatedInternship = await internship.save();
    res.json(updatedInternship);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete internship position
// @route   DELETE /api/internships/:id
// @access  Private/Admin
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    await Internship.deleteOne({ _id: req.params.id });
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// INTERNSHIP APPLICATIONS (User & Admin)
// ==========================================

// @desc    Apply for internship
// @route   POST /api/applications
// @access  Private
export const applyForInternship = async (req, res, next) => {
  try {
    const { internshipId, branch, year } = req.body;

    if (!internshipId) {
      return res.status(400).json({ message: 'Internship ID is required' });
    }

    if (!branch || !year) {
      return res.status(400).json({ message: 'Branch and Year are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file (.pdf, .doc, or .docx)' });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship position not found' });
    }

    // Check if user has already applied
    const existingApplication = await InternshipApplication.findOne({
      userId: req.user._id,
      internshipId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this position' });
    }

    // Update user's branch and year in the database
    const student = await User.findById(req.user._id);
    if (student) {
      student.branch = branch;
      student.year = year;
      await student.save();
    }

    // Store relative file path of the uploaded resume
    const resumeUrl = `/uploads/${req.file.filename}`;

    const application = await InternshipApplication.create({
      userId: req.user._id,
      internshipId,
      resumeUrl,
      status: 'Applied'
    });

    // Save user internship details to Excel sheet asynchronously (to prevent blocking)
    appendInternshipToExcelFile(application, student || req.user, internship).catch((err) =>
      console.error('Error appending internship application to excel:', err)
    );

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's applications
// @route   GET /api/applications/my-applications
// @access  Private
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await InternshipApplication.find({ userId: req.user._id })
      .populate('internshipId')
      .sort('-createdAt');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Private/Admin
export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await InternshipApplication.find({})
      .populate('userId', 'name email phone college branch year')
      .populate('internshipId', 'title duration type')
      .sort('-createdAt');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['Applied', 'Reviewed', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Please provide a valid status' });
    }

    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    const updatedApplication = await application.save();

    // Populate user and internship to get email and title for Excel update
    const populatedApp = await InternshipApplication.findById(updatedApplication._id)
      .populate('userId', 'email')
      .populate('internshipId', 'title');

    if (populatedApp && populatedApp.userId && populatedApp.internshipId) {
      updateInternshipStatusInExcelFile(
        populatedApp.userId.email,
        populatedApp.internshipId.title,
        status
      ).catch(err => console.error('Error updating status in excel:', err));
    }

    res.json(updatedApplication);
  } catch (error) {
    next(error);
  }
};

// @desc    Export all internship applications to Excel (Admin)
// @route   GET /api/applications/export
// @access  Private/Admin
export const exportApplications = async (req, res, next) => {
  try {
    const applications = await InternshipApplication.find({})
      .populate('userId', 'name email phone college branch year')
      .populate('internshipId', 'title duration type')
      .sort('-createdAt');

    const workbook = await exportInternshipApplicationsToExcel(applications);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'Shorelume_Internship_Applicants.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
