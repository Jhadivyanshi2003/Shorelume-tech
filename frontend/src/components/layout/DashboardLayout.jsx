import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  ArrowLeft,
  User,
  ShieldAlert
} from 'lucide-react';

const DashboardLayout = ({ isAdmin = false }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = isAdmin ? [
    { name: 'Admin Console', path: '/admin', icon: ShieldAlert },
    { name: 'All Internships', path: '/internships', icon: Briefcase }
  ] : [
    { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Internship Roles', path: '/internships', icon: Briefcase }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-[#f4f7fc] text-slate-700 overflow-x-hidden relative">
      {/* Glow Blur decoration */}
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-[-50px] left-[-50px]" />
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 relative z-10">
        <div className="mb-10">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="Logo" className="h-7 w-7 object-contain rounded-full" />
            <span className="font-display font-extrabold text-lg tracking-tight text-[#002060]">
              Shorelume<span className="text-brand-600">Tech</span>
            </span>
          </Link>
          <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-brand-600" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#002060] truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-brand-500/10 border border-brand-500/20 text-[#002060] font-semibold'
                        : 'text-slate-600 hover:text-[#002060] hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${isActive(item.path) ? 'text-brand-600' : 'text-slate-450'}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-[#002060] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 relative z-10 flex flex-col min-h-screen">
        <header className="mb-8 flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#002060] font-display">
              {isAdmin ? 'Admin Management Console' : 'Student Learning Hub'}
            </h1>
            <p className="text-xs text-slate-500">Welcome back, {user?.name}</p>
          </div>
          
          <Link 
            to="/" 
            className="md:hidden flex items-center space-x-1 text-xs font-semibold text-brand-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </header>

        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

