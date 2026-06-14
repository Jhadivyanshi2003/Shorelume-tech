import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../config/axios';
import { Briefcase, Calendar, MapPin, Upload, FileText, CheckCircle2, X, Lock, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const Internships = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myApplications, setMyApplications] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const intRes = await axiosInstance.get('/internships');
        setInternships(intRes.data);

        if (user) {
          const appRes = await axiosInstance.get('/applications/my-applications');
          setMyApplications(appRes.data);
        }
      } catch (err) {
        toast.error('Failed to load internships');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const hasApplied = (internshipId) => {
    return myApplications.some(app => app.internshipId._id === internshipId);
  };

  const handleOpenApplyModal = (internship) => {
    if (!user) {
      toast('Please log in to apply for internships.', { icon: '🔑' });
      navigate('/login');
      return;
    }
    setSelectedInternship(internship);
    setResumeFile(null);
    setBranch(user.branch || '');
    setYear(user.year || '');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds the 5MB limit.');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error('Please upload a resume file');
      return;
    }
    if (!branch || !year) {
      toast.error('Please provide branch and year');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('internshipId', selectedInternship._id);
      formData.append('resume', resumeFile);
      formData.append('branch', branch);
      formData.append('year', year);

      const res = await axiosInstance.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Application submitted successfully!');
      setMyApplications([...myApplications, res.data]);
      setSelectedInternship(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">
          Secured Internship Opportunities
        </h1>
        <p className="text-slate-600">
          Work with partner engineering teams, deploy real production code, and gain certified industry experience.
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-slate-200/60 rounded-2xl h-44 animate-pulse shadow-sm" />
          ))}
        </div>
      ) : internships.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200/60 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#002060] mb-2">No Openings Right Now</h3>
          <p className="text-sm text-slate-550">Check back soon for new internship listings.</p>
        </div>
      ) : (
        /* Listings Container */
        <div className="space-y-6 max-w-4xl mx-auto">
          {internships.map((job) => {
            const applied = hasApplied(job._id);
            return (
              <div 
                key={job._id}
                className="group premium-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Job Content */}
                <div className="space-y-4 flex-grow">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[#002060] group-hover:text-brand-600 transition-colors">
                      {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-655 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requirements.map((reqStr, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] font-bold text-brand-700 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-md"
                        >
                          {reqStr}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions Column */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 items-stretch sm:items-center md:items-stretch lg:items-center flex-shrink-0">
                  {/* Course Button (Locked) */}
                  <div className="relative group">
                    <button
                      disabled
                      type="button"
                      className="w-full lg:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-slate-100 border border-slate-200 text-slate-400 text-sm font-semibold rounded-xl cursor-not-allowed transition-all"
                      title="Courses currently unavailable"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Enroll in Course</span>
                      <Lock className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-slate-800 text-white text-[10px] text-center py-1.5 px-2.5 rounded-lg shadow-lg z-20">
                      Courses are currently unavailable. Contact support for details.
                    </div>
                  </div>

                  {/* Internship Button */}
                  <div>
                    {applied ? (
                      <div className="flex items-center justify-center space-x-1.5 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold rounded-xl">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                        <span>Applied for Internship</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-brand-500/10"
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Enroll in Internship</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Apply Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedInternship(null)}
          />

          {/* Modal Container */}
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 relative z-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#002060]">Apply for Role</h3>
                <p className="text-xs text-slate-500">{selectedInternship.title}</p>
              </div>
              <button 
                onClick={() => setSelectedInternship(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              {/* Prefilled User Details */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-550">Applicant:</span>
                  <span className="text-slate-805 font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-550">Email:</span>
                  <span className="text-slate-805 font-semibold">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-550">College:</span>
                  <span className="text-slate-805 font-semibold truncate max-w-xs">{user.college}</span>
                </div>
              </div>

              {/* Branch & Year Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Branch / Stream
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white"
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Year of Study
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white"
                    placeholder="e.g. 3rd Year"
                  />
                </div>
              </div>

              {/* Resume File Upload Box */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Upload Resume / CV
                </label>
                
                <div className="relative border-2 border-dashed border-slate-300 hover:border-brand-600 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 cursor-pointer transition-colors group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  
                  {resumeFile ? (
                    <>
                      <FileText className="h-10 w-10 text-brand-600" />
                      <span className="text-sm text-slate-800 font-semibold truncate max-w-xs">
                        {resumeFile.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-slate-400 group-hover:text-brand-600 transition-colors" />
                      <span className="text-sm text-slate-600 font-medium">
                        Drag & drop or click to upload
                      </span>
                      <span className="text-xs text-slate-500">
                        PDF, DOC, DOCX up to 5MB
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Actions */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInternship(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-colors flex items-center space-x-1.5"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
