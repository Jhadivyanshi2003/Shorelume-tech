import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axios';
import { BookOpen, Briefcase, FileCheck, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [regRes, appRes] = await Promise.all([
          axiosInstance.get('/registrations/my-registrations'),
          axiosInstance.get('/applications/my-applications')
        ]);
        setRegistrations(regRes.data);
        setApplications(appRes.data);
      } catch (err) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600';
      case 'Rejected':
        return 'bg-red-500/10 border-red-500/20 text-red-650';
      case 'Reviewed':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-700';
      default:
        return 'bg-brand-500/10 border-brand-500/20 text-brand-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="premium-card p-6 flex items-center space-x-4">
          <div className="p-3.5 bg-brand-500/10 rounded-xl border border-brand-500/20">
            <BookOpen className="h-6 w-6 text-brand-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Enrolled Programs</p>
            <p className="text-2xl font-extrabold text-[#002060]">{registrations.filter(r => r.paymentStatus === 'Completed').length}</p>
          </div>
        </div>

        <div className="premium-card p-6 flex items-center space-x-4">
          <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Briefcase className="h-6 w-6 text-indigo-650" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Internship Applications</p>
            <p className="text-2xl font-extrabold text-[#002060]">{applications.length}</p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#002060] flex items-center space-x-2">
          <span>Active Learning Programs</span>
          <span className="text-xs px-2.5 py-0.5 bg-brand-500/10 text-brand-700 rounded-full font-bold">
            {registrations.filter(r => r.paymentStatus === 'Completed').length}
          </span>
        </h2>
        
        {registrations.length === 0 ? (
          <div className="text-center py-10 bg-white border border-slate-200/60 rounded-2xl">
            <p className="text-sm text-slate-500">You are not enrolled in any program yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <div 
                key={reg._id} 
                className="premium-card p-6 space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-brand-500/10 border border-brand-500/20 rounded text-brand-600">
                    {reg.courseId?.category}
                  </span>
                  <h3 className="text-base font-bold text-[#002060] pt-1">{reg.courseId?.title}</h3>
                  <p className="text-xs text-slate-550">Duration: {reg.courseId?.duration}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
                    <FileCheck className="h-4 w-4" />
                    <span>Access Granted</span>
                  </div>
                  <span className="text-slate-500">Txn: {reg.transactionId ? reg.transactionId.substr(0, 15) + '...' : 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Internship Applications Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#002060]">Application Status Tracking</h2>
        
        {applications.length === 0 ? (
          <div className="text-center py-10 bg-white border border-slate-200/60 rounded-2xl">
            <p className="text-sm text-slate-500">No applications submitted yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-50">
                    <th className="py-4 px-6">Internship Position</th>
                    <th className="py-4 px-6">Duration</th>
                    <th className="py-4 px-6">Applied Date</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4.5 px-6 font-bold text-[#002060]">{app.internshipId?.title}</td>
                      <td className="py-4.5 px-6">{app.internshipId?.duration}</td>
                      <td className="py-4.5 px-6">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="py-4.5 px-6">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg border ${getStatusBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
