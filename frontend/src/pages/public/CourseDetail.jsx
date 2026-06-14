import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById } from '../../services/courseService';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../config/axios';
import { Clock, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    const fetchCourseAndCheckRegistration = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(id);
        setCourse(data);

        // Check if user is already enrolled
        if (user) {
          const res = await axiosInstance.get('/registrations/my-registrations');
          const isEnrolled = res.data.some(reg => reg.courseId._id === id && reg.paymentStatus === 'Completed');
          setAlreadyRegistered(isEnrolled);
        }
      } catch (err) {
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndCheckRegistration();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      toast('Please log in to enroll in courses.', { icon: '🔑' });
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);
      
      // Post registration request
      const res = await axiosInstance.post('/registrations', { courseId: id });
      
      // Simulate Razorpay mock payment success
      const regId = res.data._id;
      await axiosInstance.put(`/registrations/${regId}/payment-status`, {
        paymentStatus: 'Completed',
        transactionId: `txn_mock_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });

      toast.success('Inquiry sent successfully! Redirecting to dashboard...', { duration: 4000 });
      setAlreadyRegistered(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-bold text-[#002060] mb-4">Course not found</h2>
        <Link to="/courses" className="text-brand-655 hover:underline inline-flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to courses</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link 
        to="/courses" 
        className="inline-flex items-center space-x-1 text-slate-500 hover:text-[#002060] transition-colors mb-8 text-sm font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Programs</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Course Info & Syllabus */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 rounded-md text-brand-700">
              {course.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#002060]">
              {course.title}
            </h1>
            <p className="text-slate-600 leading-relaxed text-base">
              {course.description}
            </p>
          </div>

          {/* Module Syllabus */}
          {course.modules && course.modules.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-[#002060]">Syllabus Breakdown</h2>
              <div className="space-y-3">
                {course.modules.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start space-x-3.5 premium-card p-4 shadow-sm"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-lg bg-brand-500/10 text-xs text-brand-600 font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Sticky Checkout Box */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 premium-card p-6 shadow-lg shadow-slate-100/50 space-y-6">
            <div className="relative h-44 bg-slate-100 rounded-xl overflow-hidden">
              <img 
                src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500 text-sm font-medium">Program Price:</span>
                <span className="text-xs font-bold text-brand-600 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                  Contact for Pricing
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 pt-1">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>Duration: {course.duration}</span>
              </div>
            </div>

            <div className="pt-2">
              {alreadyRegistered ? (
                <div className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold rounded-xl">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Inquiry Submitted</span>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-brand-600 to-[#0099ff] hover:from-brand-500 hover:to-[#0088ee] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-brand-500/10"
                >
                  <span>{enrolling ? 'Processing...' : 'Send Enrollment Inquiry'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="text-[10px] text-center text-slate-400 leading-relaxed pt-2">
              <ShieldCheck className="h-4 w-4 inline mr-1 text-slate-400" />
              100% Secure Transaction. 7-Day Money-Back Guarantee.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
