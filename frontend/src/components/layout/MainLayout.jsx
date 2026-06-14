import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import logoTextImg from '../../assets/logo_text.png';
import { 
  BookOpen, 
  Briefcase, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  Code,
  GraduationCap,
  Sparkles
} from 'lucide-react';

const MainLayout = () => {
  const { user, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutContext();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Internships', path: '/internships' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fc] text-slate-600 overflow-x-hidden relative">
      {/* Background Decorative Glows */}
      <div className="glow-blur glow-primary w-[40vw] h-[40vw] top-[-10vw] left-[-10vw]" />
      <div className="glow-blur glow-secondary w-[40vw] h-[40vw] bottom-[10vw] right-[-10vw]" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="p-1 group-hover:scale-105 transition-transform flex items-center justify-center">
                  <img src={logoImg} alt="Logo" className="h-9 w-9 object-contain rounded-full shadow-sm" />
                </div>
                <img 
                  src={logoTextImg} 
                  alt="Shorelume Tech" 
                  className="h-10 object-contain mix-blend-multiply" 
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                    isActive(link.path) 
                      ? 'text-brand-600 font-bold' 
                      : 'text-slate-500 hover:text-brand-600'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-[#0099ff] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4 text-brand-600" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-600 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,102,255,0.4)] hover:shadow-[0_4px_25px_-2px_rgba(0,102,255,0.6)] transition-all animate-pulse-slow"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-[#0099ff] group-hover:opacity-90 transition-opacity" />
                    <span className="relative flex items-center space-x-1">
                      <span>Get Started</span>
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-550 hover:text-brand-605 hover:bg-slate-100 focus:outline-none transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200/50 px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-500/10 text-brand-600 font-bold border-l-2 border-brand-500'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200/50 mt-4 px-3 flex flex-col space-y-3">
              {user ? (
                <>
                  <Link
                    to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl text-base font-medium bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    <LayoutDashboard className="h-5 w-5 text-brand-600" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl text-base font-medium bg-red-500/10 border border-red-500/20 text-red-650"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl text-base font-semibold text-slate-600 hover:text-brand-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-[#0099ff]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow z-10 flex flex-col">
        <Outlet />
      </main>

      {/* Footer - Navy blue flyer brand colors */}
      <footer className="bg-[#051329] border-t border-blue-950 z-10 py-12 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding Column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center space-x-2">
                <img src={logoImg} alt="Logo" className="h-7 w-7 object-contain rounded-full" />
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  Shorelume<span className="text-brand-400">Tech</span>
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Empowering the next generation of engineers with advanced tech training and high-quality practical internship applications.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                <li><Link to="/about" className="text-sm text-slate-350 hover:text-brand-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-slate-350 hover:text-brand-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-sm text-slate-350 hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-slate-350 hover:text-brand-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/faqs" className="text-sm text-slate-350 hover:text-brand-400 transition-colors">FAQs & Help</Link></li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Email</span>
                  <a href="mailto:shorelumetech@gmail.com" className="hover:text-brand-400 transition-colors">shorelumetech@gmail.com</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Phone</span>
                  <a href="tel:+919811308982" className="hover:text-brand-400 transition-colors">+91 9811308982</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Address</span>
                  <span>Sec 17, noida</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Newsletter</h3>
              <p className="text-sm text-slate-300">Stay up to date with new courses and openings.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 flex-grow"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-brand-600 hover:bg-brand-500 rounded-xl transition-colors text-white"
                >
                  <Code className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <p className="text-xs text-slate-400">&copy; 2026 Shorelume Tech. All Rights Reserved.</p>
              <p className="text-xs text-slate-400">Empowering the next generation through technology-focused education and industry-ready skills.</p>
            </div>
            <div className="flex space-x-6 text-xs text-slate-400">
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
              <Link to="/faqs" className="hover:text-slate-300 transition-colors">FAQs & Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
