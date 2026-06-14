import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';
import { BookOpen, Search, Clock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI', 'Data Science', 'ML', 'Full Stack', 'Cloud', 'Cybersecurity'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses(selectedCategory === 'All' ? '' : selectedCategory);
        setCourses(data);
      } catch (err) {
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [selectedCategory]);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">
          Explore Our Tech Programs
        </h1>
        <p className="text-slate-600">
          Gain deep, practical understanding of cutting-edge tech curriculum. Led by experts, backed by real projects.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
        {/* Categories Tab */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                (cat === 'All' && !selectedCategory) || selectedCategory === cat
                  ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-[#002060] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
          />
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-slate-200/60 rounded-2xl h-96 animate-pulse shadow-sm" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#002060] mb-2">No Programs Found</h3>
          <p className="text-sm text-slate-550">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course._id} 
              className="group flex flex-col premium-card overflow-hidden"
            >
              {/* Image thumbnail placeholder */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-600 rounded-md text-white">
                  {course.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#002060] group-hover:text-brand-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-550 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                    Contact for Pricing
                  </span>
                  
                  <Link
                    to={`/courses/${course._id}`}
                    className="flex items-center space-x-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
