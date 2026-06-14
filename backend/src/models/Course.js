import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['AI', 'Data Science', 'ML', 'Full Stack', 'Cloud', 'Cybersecurity'] 
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnailUrl: { type: String, default: '' },
  duration: { type: String, required: true }, // e.g. '8 Weeks'
  modules: [{ type: String }]
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
