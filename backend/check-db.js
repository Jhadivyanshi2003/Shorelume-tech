import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import Internship from './src/models/Internship.js';
import InternshipApplication from './src/models/InternshipApplication.js';

dotenv.config();

async function run() {
  await connectDB();
  
  const users = await User.find({}).sort('-createdAt').limit(3);
  console.log('--- RECENT USERS ---');
  users.forEach(u => {
    console.log(`Email: ${u.email}, Name: ${u.name}, Role: ${u.role}, CreatedAt: ${u.createdAt}`);
  });

  const apps = await InternshipApplication.find({})
    .populate('userId', 'name email')
    .populate('internshipId', 'title')
    .sort('-createdAt')
    .limit(3);
  
  console.log('--- RECENT APPLICATIONS ---');
  if (apps.length === 0) {
    console.log('No applications.');
  } else {
    apps.forEach(a => {
      console.log(`User: ${a.userId ? a.userId.email : 'N/A'}, Internship: ${a.internshipId ? a.internshipId.title : 'N/A'}, Status: ${a.status}, CreatedAt: ${a.createdAt}`);
    });
  }
  process.exit(0);
}

run();
