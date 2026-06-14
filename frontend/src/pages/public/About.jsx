import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Sparkles, 
  Cpu, 
  Database, 
  TrendingUp, 
  Globe, 
  Layers, 
  Shield, 
  Terminal, 
  CheckSquare, 
  Cloud,
  CheckCircle,
  Users,
  Briefcase,
  Heart
} from 'lucide-react';

const About = () => {
  const offerings = [
    { name: 'Artificial Intelligence (AI)', icon: Cpu, desc: 'Advanced cognitive systems and deep learning paradigms.' },
    { name: 'Data Science & Analytics', icon: Database, desc: 'Big data modeling, statistics, and business intelligence.' },
    { name: 'Machine Learning', icon: TrendingUp, desc: 'Predictive modeling, regression, neural networks, and pattern recognition.' },
    { name: 'Full Stack Web Development', icon: Globe, desc: 'Modern web engineering architectures (MERN, Next.js, APIs).' },
    { name: 'UI/UX Design', icon: Layers, desc: 'User interface layout, interaction design, and visual brand identity.' },
    { name: 'Cyber Security', icon: Shield, desc: 'Ethical hacking, threat mitigation, and infrastructure defense.' },
    { name: 'Software Development', icon: Terminal, desc: 'Agile application engineering, systems design, and architecture.' },
    { name: 'Software Testing', icon: CheckSquare, desc: 'Automated validation, QA pipelines, and test-driven development.' },
    { name: 'Cloud & Emerging Technologies', icon: Cloud, desc: 'Serverless deployment, AWS/Azure devops pipelines, and Web3.' }
  ];

  const values = [
    {
      title: 'Industry-Focused Learning',
      desc: 'We believe education should go beyond theory. Our programs focus on real-world projects, practical implementation, problem-solving, and industry-standard tools so students can develop skills that employers truly value.',
      icon: Target,
      color: 'from-blue-500/20 to-indigo-500/10'
    },
    {
      title: 'Innovation-Driven Education',
      desc: 'Technology is evolving every day, and so are we. Shorelume Tech continuously updates its learning methods, course content, and training strategies to ensure students stay aligned with the latest industry trends and advancements.',
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/10'
    },
    {
      title: 'Empowering Future Careers',
      desc: 'Our goal is not just to teach skills, but to help learners build successful careers in technology. Whether someone is a beginner starting their journey or a professional upgrading their expertise, Shorelume Tech provides the guidance, mentorship, and support needed for growth.',
      icon: Award,
      color: 'from-amber-500/20 to-orange-500/10'
    },
    {
      title: 'Community & Growth',
      desc: 'At Shorelume Tech, learning is collaborative and growth-oriented. We encourage creativity, teamwork, innovation, and continuous learning through an engaging and supportive community environment.',
      icon: Users,
      color: 'from-emerald-500/20 to-teal-500/10'
    }
  ];

  const team = [
    {
      name: 'Jyoti Pandit',
      role: 'Founder',
      initials: 'JP',
      color: 'from-violet-600 to-indigo-600',
      bio: 'The Founder of Shorelume Tech is a visionary leader passionate about transforming education through technology and innovation. With a strong commitment to empowering students and aspiring professionals, the founder established Shorelume Tech with the mission of making next-generation technology education practical, accessible, and career-focused. Driven by the belief that skills are the foundation of future success, the founder continues to inspire learners by creating opportunities in emerging fields such as Artificial Intelligence, Data Science, Web Development, Cyber Security, Machine Learning, and Software Development. Through leadership, innovation, and dedication, the founder aims to bridge the gap between education and industry requirements, helping students build successful careers in the digital era.'
    },
    {
      name: 'Sahil pandit',
      role: 'Co-Founder',
      initials: 'SP',
      color: 'from-cyan-600 to-blue-600',
      bio: 'The Co-Founder of Shorelume Tech plays a vital role in shaping the organization’s growth, strategy, and learning ecosystem. Focused on innovation and student success, the co-founder is dedicated to building a platform where learners can gain practical knowledge and industry-ready skills. With a passion for technology and education, the co-founder works closely with mentors, trainers, and development teams to ensure high-quality learning experiences and continuous improvement across all programs. The vision is to create a dynamic and supportive environment where students can learn, innovate, and confidently achieve their career goals.'
    },
    {
      name: 'Harsh Ranjan singh',
      role: 'Managing Director',
      initials: 'HR',
      color: 'from-emerald-600 to-teal-600',
      bio: 'The Managing Director of Shorelume Tech oversees the organization’s operations, strategic planning, and long-term development. With strong leadership and a future-oriented mindset, the Managing Director ensures that the platform maintains excellence in education, innovation, and learner satisfaction. By focusing on operational efficiency, quality training standards, and industry collaboration, the Managing Director helps Shorelume Tech grow as a trusted educational and technology platform. The commitment is to deliver impactful learning experiences that prepare students for real-world challenges and future career opportunities.'
    }
  ];

  const reasons = [
    'Industry-relevant courses',
    'Practical and project-based learning',
    'Experienced mentors and trainers',
    'Flexible online learning environment',
    'Career-focused training programs',
    'Continuous support and guidance'
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">
      {/* Decorative Glow Elements */}
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-10 left-10" />
      <div className="glow-blur glow-secondary w-[400px] h-[400px] bottom-40 right-10" />

      {/* Hero Welcome Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
          <Sparkles className="h-4 w-4 text-brand-600" />
          <span>Welcome to Shorelume Tech</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#002060] tracking-tight">
          Shaping the Future of <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-[#0099ff] bg-clip-text text-transparent">Learning</span>
        </h1>
        <div className="space-y-4 max-w-3xl mx-auto text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            At Shorelume Tech, we are shaping the future of learning through innovation, technology, and practical education. As a modern educational platform, our mission is to equip students and aspiring professionals with industry-relevant skills that prepare them for the rapidly evolving digital world.
          </p>
          <p>
            We specialize in next-generation technologies and provide hands-on training programs designed to bridge the gap between theoretical knowledge and real-world application. Our learning ecosystem empowers students to build confidence, gain practical experience, and become job-ready professionals.
          </p>
        </div>
      </div>

      {/* Vision Card - dark navy style */}
      <div className="premium-card-dark p-8 sm:p-10 relative overflow-hidden z-10 max-w-4xl mx-auto">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target className="h-40 w-40 text-white" />
        </div>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 bg-white/10 rounded-xl border border-white/20 text-brand-300">
              <Target className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-display font-bold text-white">Our Vision</h2>
          </div>
          <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
            Our vision is to create a future where quality technology education is accessible to everyone. We aim to inspire and empower the next generation of innovators, developers, designers, and tech leaders by providing modern, skill-oriented learning opportunities.
          </p>
        </div>
      </div>

      {/* What We Offer Grid */}
      <div className="space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-display font-bold text-[#002060]">What We Offer</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Professional training in some of the most in-demand and future-focused domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="premium-card p-6 group flex items-start space-x-4"
              >
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-[#002060] group-hover:text-brand-600 transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto italic font-semibold pt-2">
          "Our courses are designed with a practical approach, helping learners understand how technologies are applied in real industry environments."
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-display font-bold text-[#002060]">Our Foundations</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            The values and goals that drive everything we do at Shorelume Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx} 
                className="premium-card p-8 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6"
              >
                <div className="p-3.5 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-600 flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#002060] font-display">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose & Thank You split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10">
        {/* Why Choose */}
        <div className="premium-card p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-[#002060]">Why Choose Shorelume Tech?</h3>
            <ul className="space-y-3">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-slate-655">
                  <CheckCircle className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                  <span className="text-sm font-semibold">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thank You Card - dark navy flyer banner style */}
        <div className="bg-gradient-to-br from-[#002060] to-[#082146] border border-brand-500/20 p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-4 shadow-2xl relative overflow-hidden text-white">
          <div className="glow-blur glow-primary opacity-20 w-[150px] h-[150px]" />
          <Heart className="h-12 w-12 text-brand-400 animate-pulse" />
          <h3 className="text-2xl font-display font-black text-white">Thank You</h3>
          <p className="text-sm sm:text-base text-slate-205 leading-relaxed max-w-md">
            Thank you for being a part of Shorelume Tech. Together, let’s learn, innovate, and build the future with technology.
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="space-y-12 relative z-10 pt-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-display font-bold text-[#002060]">Meet Our Leaders</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            The visionary minds guiding our mission to transform technology education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="premium-card p-8 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-extrabold text-lg shadow-md border border-white/10`}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#002060] font-display">{member.name}</h4>
                    <p className="text-xs text-brand-655 font-bold tracking-wide uppercase">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

