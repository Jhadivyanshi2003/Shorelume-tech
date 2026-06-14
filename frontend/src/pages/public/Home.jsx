import { Link } from 'react-router-dom';
import { 
   GraduationCap, 
   Briefcase, 
   ArrowRight, 
   Award, 
   Sparkles,
   Zap,
   Code
} from 'lucide-react';
import heroBoyImg from '../../assets/hero_boy.jpg';

const Home = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Industry-Aligned Courses',
      description: 'Master in-demand skills in AI, Machine Learning, Full Stack, and Data Science designed by industry practitioners.',
      badge: 'Certified'
    },
    {
      icon: Briefcase,
      title: 'Practical Internships',
      description: 'Work on actual production code bases, receive mentorship, and obtain an internship experience letter.',
      badge: 'Guaranteed'
    },
    {
      icon: Award,
      title: 'Verifiable Credentials',
      description: 'Earn shareable cryptographic certificates and detailed transcripts of course modules completed.',
      badge: 'Secure'
    }
  ];

  const processSteps = [
    { step: '01', title: 'Learn the Skills', desc: 'Enroll in state-of-the-art tech curriculum modules.' },
    { step: '02', title: 'Apply to Positions', desc: 'Unlock exclusive internship roles directly on the platform.' },
    { step: '03', title: 'Build & Deploy', desc: 'Work under expert guidance to complete high-impact projects.' },
    { step: '04', title: 'Advance Career', desc: 'Receive certified credentials and resume recommendations.' },
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative glows on background */}
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-10 left-10" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
              <Sparkles className="h-4 w-4 text-brand-600" />
              <span>Launch Your Tech Career Today</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#002060] leading-none uppercase">
              START TODAY.<br />
              SKILL TOMORROW.<br />
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-[#0099ff] bg-clip-text text-transparent">
                SUCCEED FOREVER.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-650 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
              Internships. Courses. Real-world Projects.<br />
              Everything you need to <span className="text-brand-600 font-semibold">grow.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/internships"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-[0_8px_30px_rgb(92,102,222,0.3)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/internships"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all shadow-sm"
              >
                <span>Browse Internships</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic / Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Background Decorative Rings/Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
            <div className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200/40 bg-white p-2 hover:scale-[1.02] transition-transform duration-300">
              <img 
                src={heroBoyImg} 
                alt="Shorelume Tech Internships" 
                className="w-full h-auto rounded-2xl block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#002060]">
            A Complete Career Accelerating Engine
          </h2>
          <p className="text-slate-500">
            Everything you need to level up from a classroom student to a hireable production software engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="group relative bg-white border border-slate-200/60 rounded-2xl p-8 transition-all hover:shadow-lg shadow-sm hover:border-brand-500/20"
              >
                <div className="p-3 bg-brand-500/10 rounded-xl border border-brand-500/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <div className="absolute top-8 right-8 text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-550">
                  {feat.badge}
                </div>
                <h3 className="text-xl font-bold text-[#002060] mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works / Process Section */}
      <section className="py-24 border-t border-slate-100 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#002060]">
              How Shorelume Works
            </h2>
            <p className="text-slate-500">
              Four structured phases that guide your transformation from zero to tech professional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative space-y-4">
                <div className="text-5xl font-extrabold font-display bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent opacity-35">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#002060]">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#002060] to-[#082146] border border-brand-500/20 rounded-3xl p-8 md:p-16 text-center shadow-2xl">
          {/* Inner Glows */}
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-[#0099ff]/10 blur-[80px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Zap className="h-10 w-10 text-brand-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-slate-300">
              Join thousands of students and build actual, production-ready engineering portfolios today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 bg-white text-[#002060] hover:bg-slate-100 font-semibold rounded-xl transition-all shadow-lg"
              >
                <span>Create Free Account</span>
              </Link>
              <Link
                to="/internships"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <span>View Internship Domains</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
