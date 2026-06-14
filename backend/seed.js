import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import Course from './src/models/Course.js';
import Internship from './src/models/Internship.js';

dotenv.config();

const coursesData = [
  {
    title: 'Full Stack Web Development with React & Node',
    category: 'Full Stack',
    price: 15000,
    duration: '12 Weeks',
    description: 'Comprehensive training on modern full stack architecture, database design, REST APIs, and responsive React frontend development.',
    modules: ['HTML, CSS & Tailwind', 'JavaScript ES6+', 'React.js State & Router', 'Node.js & Express', 'MongoDB & Mongoose', 'Deployment & CI/CD'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Artificial Intelligence & Large Language Models',
    category: 'AI',
    price: 25000,
    duration: '10 Weeks',
    description: 'Dive deep into NLP, model fine-tuning, embeddings, agentic workflows, and integrations using OpenAI, Gemini, and LangChain.',
    modules: ['Introduction to AI & Python', 'Machine Learning Foundations', 'Deep Learning & Neural Networks', 'Transformers & LLMs', 'Prompt Engineering & RAG', 'Building Agentic Workflows'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Machine Learning Engineering',
    category: 'ML',
    price: 18000,
    duration: '8 Weeks',
    description: 'Learn to build, evaluate, and deploy production-grade machine learning models from scratch using Scikit-Learn, Pandas, and TensorFlow.',
    modules: ['Data Cleaning & Feature Engineering', 'Supervised Learning Models', 'Unsupervised Learning Models', 'Model Evaluation & Metrics', 'TensorFlow & PyTorch basics', 'MLOps & Model Deployment'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Practical Data Science & Analytics',
    category: 'Data Science',
    price: 12000,
    duration: '8 Weeks',
    description: 'Master data visualization, statistical hypothesis testing, SQL database queries, and predictive insights using Python libraries.',
    modules: ['SQL & Data Querying', 'Pandas & Numpy', 'Matplotlib & Seaborn', 'Statistical Analysis', 'Data Cleaning Techniques', 'Introduction to Tableau'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
  }
];

const internshipsData = [
  {
    title: 'Frontend Engineer Intern (React)',
    type: 'Remote',
    duration: '3 Months',
    description: 'Work on styling, component logic, dynamic interactive landing pages, and state management using Vite, React, and Tailwind CSS.',
    requirements: ['Strong Javascript fundamentals', 'Experience with React.js & hooks', 'Familiarity with Tailwind CSS', 'Basic Git workflows']
  },
  {
    title: 'Backend Engineer Intern (Node.js)',
    type: 'Remote',
    duration: '3 Months',
    description: 'Develop RESTful APIs, integrate payment gateways, implement authentication mechanisms, and maintain Mongo database queries.',
    requirements: ['Node.js & Express.js proficiency', 'Understanding of MongoDB/Mongoose', 'Knowledge of JWT authentication', 'Basic REST API design principles']
  },
  {
    title: 'AI/ML Intern',
    type: 'Hybrid',
    duration: '6 Months',
    description: 'Assist in developing machine learning models, scraping data, processing training pipelines, and building LLM prototypes using Python.',
    requirements: ['Python programming proficiency', 'Basic understanding of ML concepts', 'Familiarity with Jupyter, NumPy, Pandas', 'Experience with OpenAI/HuggingFace API is a plus']
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing
    console.log('Clearing existing Courses...');
    await Course.deleteMany({});
    
    console.log('Clearing existing Internships...');
    await Internship.deleteMany({});
    
    // Seed
    console.log('Seeding Courses...');
    await Course.insertMany(coursesData);
    
    console.log('Seeding Internships...');
    await Internship.insertMany(internshipsData);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
