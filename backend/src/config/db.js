import mongoose from 'mongoose';
import dns from 'dns';
import Internship from '../models/Internship.js';

const seedInternshipDomains = async () => {
  try {
    const requiredDomains = [
      {
        title: 'Artificial Intelligence (AI)',
        description: 'Advanced cognitive systems and deep learning paradigms.',
        duration: '3-6 Months',
        requirements: ['Python', 'Neural Networks', 'TensorFlow/PyTorch'],
        type: 'Remote'
      },
      {
        title: 'Data Science & Analytics',
        description: 'Big data modeling, statistics, and business intelligence.',
        duration: '3-6 Months',
        requirements: ['SQL', 'Python/R', 'Data Visualization', 'Pandas'],
        type: 'Remote'
      },
      {
        title: 'Machine Learning',
        description: 'Predictive modeling, regression, neural networks, and pattern recognition.',
        duration: '3-6 Months',
        requirements: ['Python', 'Scikit-Learn', 'Linear Algebra', 'Supervised/Unsupervised Learning'],
        type: 'Remote'
      },
      {
        title: 'Full Stack Web Development',
        description: 'Modern web engineering architectures (MERN, Next.js, APIs).',
        duration: '3-6 Months',
        requirements: ['React.js', 'Node.js/Express', 'MongoDB', 'Tailwind CSS'],
        type: 'Remote'
      },
      {
        title: 'UI/UX Design',
        description: 'User interface layout, interaction design, and visual brand identity.',
        duration: '3-6 Months',
        requirements: ['Figma', 'User Research', 'Wireframing & Prototyping'],
        type: 'Remote'
      },
      {
        title: 'Cyber Security',
        description: 'Ethical hacking, threat mitigation, and infrastructure defense.',
        duration: '3-6 Months',
        requirements: ['Network Security', 'Ethical Hacking Tools', 'Linux', 'Penetration Testing'],
        type: 'Remote'
      },
      {
        title: 'Software Development',
        description: 'Agile application engineering, systems design, and architecture.',
        duration: '3-6 Months',
        requirements: ['Java/C++', 'Data Structures & Algorithms', 'Git/Version Control'],
        type: 'Remote'
      },
      {
        title: 'Software Testing',
        description: 'Automated validation, QA pipelines, and test-driven development.',
        duration: '3-6 Months',
        requirements: ['Selenium', 'Automation Testing', 'Jest/Mocha', 'Manual Testing Basics'],
        type: 'Remote'
      },
      {
        title: 'Cloud & Emerging Technologies',
        description: 'Serverless deployment, AWS/Azure devops pipelines, and Web3.',
        duration: '3-6 Months',
        requirements: ['AWS/Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Serverless Architecture'],
        type: 'Remote'
      }
    ];

    const count = await Internship.countDocuments({});
    const existing = await Internship.find({});
    const matchesAll = requiredDomains.every(req => existing.some(ext => ext.title === req.title));

    if (count !== requiredDomains.length || !matchesAll) {
      console.log('Resetting/seeding internships database with the 9 target domains...');
      await Internship.deleteMany({});
      await Internship.insertMany(requiredDomains);
      console.log('Seeded 9 internship domains successfully.');
    }
  } catch (error) {
    console.error('Error seeding internship domains:', error.message);
  }
};

const connectDB = async () => {
  try {
    // Fallback to public DNS if local resolver fails to resolve MongoDB SRV record
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb+srv')) {
      try {
        const urlParts = process.env.MONGODB_URI.split('@');
        if (urlParts.length > 1) {
          const host = urlParts[1].split('/')[0].split('?')[0];
          await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
        }
      } catch (dnsErr) {
        console.warn('Local DNS resolver failed to resolve MongoDB SRV. Trying public DNS resolvers (8.8.8.8, 1.1.1.1)...');
        try {
          dns.setServers(['8.8.8.8', '1.1.1.1']);
        } catch (setDnsErr) {
          console.error('Failed to set public DNS servers:', setDnsErr.message);
        }
      }
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed
    await seedInternshipDomains();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

