import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      loginContext(res);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-md w-full space-y-8 premium-card p-8 relative z-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#002060] font-display">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Sign in to continue your learning journey
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                {...register("email")} 
                type="email" 
                placeholder="you@example.com" 
                className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
              />
              <p className="text-red-500 text-xs mt-1.5">{errors.email?.message}</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                {...register("password")} 
                type="password" 
                placeholder="••••••••" 
                className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm transition-all" 
              />
              <p className="text-red-500 text-xs mt-1.5">{errors.password?.message}</p>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
