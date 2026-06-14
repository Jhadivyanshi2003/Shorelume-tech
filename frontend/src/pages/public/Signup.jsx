import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  college: yup.string().required('College name is required'),
  branch: yup.string().required('Branch is required'),
  year: yup.string().required('Year is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
}).required();

const Signup = () => {
  const { register: formRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const res = await register(userData);
      loginContext(res);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="glow-blur glow-secondary w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-lg w-full space-y-8 premium-card p-8 relative z-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#002060] font-display">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Join Shorelume Tech and launch your developer career
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  {...formRegister("name")} 
                  placeholder="John Doe" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  {...formRegister("email")} 
                  type="email" 
                  placeholder="john@example.com" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  {...formRegister("phone")} 
                  placeholder="+91 XXXXX XXXXX" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">College / University</label>
                <input 
                  {...formRegister("college")} 
                  placeholder="IIT Bombay, etc." 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.college?.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Branch / Stream</label>
                <input 
                  {...formRegister("branch")} 
                  placeholder="Computer Science" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.branch?.message}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Year of Study</label>
                <input 
                  {...formRegister("year")} 
                  placeholder="3rd Year" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.year?.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <input 
                  {...formRegister("password")} 
                  type="password" 
                  placeholder="••••••••" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                <input 
                  {...formRegister("confirmPassword")} 
                  type="password" 
                  placeholder="••••••••" 
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
                />
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
              </div>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
