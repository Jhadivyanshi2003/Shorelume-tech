import mongoose from 'mongoose';

const internshipApplicationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  internshipId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Internship', 
    required: true 
  },
  resumeUrl: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Applied', 'Reviewed', 'Accepted', 'Rejected'], 
    default: 'Applied' 
  }
}, {
  timestamps: true
});

const InternshipApplication = mongoose.model('InternshipApplication', internshipApplicationSchema);
export default InternshipApplication;
