import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true }, // e.g. '3 Months'
  requirements: [{ type: String }],
  type: { 
    type: String, 
    required: true,
    enum: ['Remote', 'Hybrid', 'Onsite'],
    default: 'Remote'
  }
}, {
  timestamps: true
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
