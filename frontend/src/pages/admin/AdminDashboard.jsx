import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axios';
import { 
  Users, 
  BookOpen, 
  FileSpreadsheet, 
  Plus, 
  Briefcase, 
  Download, 
  Check, 
  Trash 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'AI',
    description: '',
    price: '',
    duration: '',
    modules: ''
  });
  const [submittingCourse, setSubmittingCourse] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [regRes, appRes, courseRes] = await Promise.all([
        axiosInstance.get('/registrations'),
        axiosInstance.get('/applications'),
        axiosInstance.get('/courses')
      ]);
      setRegistrations(regRes.data);
      setApplications(appRes.data);
      setCourses(courseRes.data);
    } catch (err) {
      toast.error('Failed to load admin dataset');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      toast.loading('Compiling spreadsheet...', { id: 'excel' });
      
      const response = await axiosInstance.get('/registrations/export', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Shorelume_Course_Registrations.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success('Spreadsheet downloaded!', { id: 'excel' });
    } catch (error) {
      toast.error('Failed to export registration data', { id: 'excel' });
    }
  };

  const handleExportStudents = async () => {
    try {
      toast.loading('Compiling students registry...', { id: 'excel-students' });
      
      const response = await axiosInstance.get('/auth/export', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Shorelume_Registered_Students.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success('Students registry downloaded!', { id: 'excel-students' });
    } catch (error) {
      toast.error('Failed to export student registry data', { id: 'excel-students' });
    }
  };

  const handleExportApplicants = async () => {
    try {
      toast.loading('Compiling internship applicants registry...', { id: 'excel-applicants' });
      
      const response = await axiosInstance.get('/applications/export', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Shorelume_Internship_Applicants.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success('Applicants registry downloaded!', { id: 'excel-applicants' });
    } catch (error) {
      toast.error('Failed to export internship applicants data', { id: 'excel-applicants' });
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus });
      toast.success(`Application status updated to ${newStatus}`);
      
      // Update state locally
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.price || !newCourse.duration) {
      toast.error('Please fill in all course fields');
      return;
    }

    try {
      setSubmittingCourse(true);
      const parsedModules = newCourse.modules 
        ? newCourse.modules.split(',').map(m => m.trim()).filter(Boolean)
        : [];

      const payload = {
        ...newCourse,
        price: Number(newCourse.price),
        modules: parsedModules
      };

      const res = await axiosInstance.post('/courses', payload);
      toast.success('Course created successfully!');
      
      // Append to local state and reset form
      setCourses([res.data, ...courses]);
      setNewCourse({
        title: '',
        category: 'AI',
        description: '',
        price: '',
        duration: '',
        modules: ''
      });
    } catch (err) {
      toast.error('Failed to create course');
    } finally {
      setSubmittingCourse(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await axiosInstance.delete(`/courses/${courseId}`);
      toast.success('Course deleted successfully');
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  // Calculate metrics
  const totalRevenue = registrations
    .filter(r => r.paymentStatus === 'Completed')
    .reduce((sum, r) => sum + (r.courseId?.price || 0), 0);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="premium-card p-6">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Registrations</p>
          <p className="text-2xl font-extrabold text-[#002060] mt-1">{registrations.length}</p>
        </div>
        <div className="premium-card p-6">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Completed Payments</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">
            {registrations.filter(r => r.paymentStatus === 'Completed').length}
          </p>
        </div>
        <div className="premium-card p-6">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Earnings</p>
          <p className="text-2xl font-extrabold text-brand-600 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="premium-card p-6">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Internship Applicants</p>
          <p className="text-2xl font-extrabold text-indigo-650 mt-1">{applications.length}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-6 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all ${
            activeTab === 'registrations'
              ? 'border-brand-600 text-[#002060] font-bold'
              : 'border-transparent text-slate-500 hover:text-[#002060]'
          }`}
        >
          Enrollments List
        </button>
        
        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-6 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all ${
            activeTab === 'applicants'
              ? 'border-brand-600 text-[#002060] font-bold'
              : 'border-transparent text-slate-500 hover:text-[#002060]'
          }`}
        >
          Internship Applicants
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-6 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all ${
            activeTab === 'courses'
              ? 'border-brand-600 text-[#002060] font-bold'
              : 'border-transparent text-slate-500 hover:text-[#002060]'
          }`}
        >
          Programs Manager
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        
        {/* Registrations List Tab */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-[#002060]">Course Enrollments Log</h2>
                <p className="text-xs text-slate-500">Overview of paid and pending programs</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleExportStudents}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export Students</span>
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export Enrollments</span>
                </button>
              </div>
            </div>

            {registrations.length === 0 ? (
              <p className="text-slate-550 text-center py-10 text-sm">No enrollments yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-50">
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">College</th>
                      <th className="py-3 px-4">Course Enrolled</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {registrations.map(reg => (
                      <tr key={reg._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-bold text-[#002060]">{reg.userId?.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{reg.userId?.email || 'N/A'}</p>
                        </td>
                        <td className="py-4 px-4 text-xs max-w-xs truncate">{reg.userId?.college || 'N/A'}</td>
                        <td className="py-4 px-4 font-medium text-[#002060]">{reg.courseId?.title || 'Deleted Course'}</td>
                        <td className="py-4 px-4">₹{reg.courseId?.price?.toLocaleString() || 0}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${
                            reg.paymentStatus === 'Completed'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-750'
                          }`}>
                            {reg.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Internship Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-[#002060]">Internship Applications Manager</h2>
                <p className="text-xs text-slate-500">Track and review student documents and resume applications</p>
              </div>
              <div>
                <button
                  onClick={handleExportApplicants}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-colors shadow-md animate-fadeIn"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export Applicants</span>
                </button>
              </div>
            </div>

            {applications.length === 0 ? (
              <p className="text-slate-550 text-center py-10 text-sm">No applications submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-50">
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Branch & College</th>
                      <th className="py-3 px-4">Role Applied</th>
                      <th className="py-3 px-4">Resume</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {applications.map(app => (
                      <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-bold text-[#002060]">{app.userId?.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{app.userId?.email || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{app.userId?.phone || 'N/A'}</p>
                        </td>
                        <td className="py-4 px-4 text-xs">
                          <p className="text-[#002060] font-semibold">{app.userId?.college || 'N/A'}</p>
                          <p className="text-slate-500">{app.userId?.branch} ({app.userId?.year})</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-[#002060]">{app.internshipId?.title || 'Position Removed'}</p>
                          <p className="text-xs text-slate-500">{app.internshipId?.type}</p>
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href={`${axiosInstance.defaults.baseURL.replace('/api', '')}${app.resumeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs text-brand-600 hover:text-brand-500 font-semibold"
                          >
                            <Download className="h-4.5 w-4.5" />
                            <span>Download CV</span>
                          </a>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Courses Manager Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List Existing Courses */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-[#002060]">Active Tech Programs</h2>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {courses.map(course => (
                  <div 
                    key={course._id} 
                    className="bg-slate-50 border border-slate-200/60 rounded-xl p-4.5 flex items-center justify-between gap-4 animate-fadeIn"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-brand-500/10 border border-brand-500/20 rounded text-brand-600">
                        {course.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#002060] pt-1">{course.title}</h4>
                      <p className="text-xs text-slate-550">Contact for Pricing • {course.duration}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-xl transition-all"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Create Course Form */}
            <div className="lg:col-span-1 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl h-fit space-y-6">
              <h3 className="text-base font-bold text-[#002060] border-b border-slate-200 pb-3">Create New Course</h3>
              
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-brand-500"
                    placeholder="e.g. AI Engineering"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    >
                      <option value="AI">AI</option>
                      <option value="Data Science">Data Science</option>
                      <option value="ML">ML</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-brand-500"
                      placeholder="e.g. 8 Weeks"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Price (INR)</label>
                    <input
                      type="number"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-455 focus:outline-none focus:border-brand-500"
                      placeholder="e.g. 15000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Modules (comma-separated)</label>
                  <input
                    type="text"
                    value={newCourse.modules}
                    onChange={(e) => setNewCourse({ ...newCourse, modules: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-brand-500"
                    placeholder="e.g. React Router, Axios, Context"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows="3"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-brand-500 resize-none"
                    placeholder="Course description summary..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingCourse}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>{submittingCourse ? 'Creating...' : 'Create Course'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
