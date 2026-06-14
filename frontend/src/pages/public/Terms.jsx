import React from 'react';
import { Scale, CheckCircle2, AlertOctagon, RefreshCw } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: 'User Accounts',
      desc: 'Users are responsible for maintaining the confidentiality of their account credentials.'
    },
    {
      title: 'Course Access',
      desc: 'Purchased courses are intended for personal use only and may not be shared or redistributed.'
    },
    {
      title: 'Payments',
      desc: 'All payments must be completed before accessing paid content.'
    },
    {
      title: 'Intellectual Property',
      desc: 'All content on Shorelume Tech, including videos, text, graphics, and materials, is the intellectual property of Shorelume Tech.'
    }
  ];

  const prohibited = [
    'Share account credentials',
    'Upload harmful or illegal content',
    'Attempt unauthorized access to the platform',
    'Copy or distribute course materials without permission'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
      {/* Glow background decorations */}
      <div className="glow-blur glow-secondary w-[300px] h-[300px] top-10 right-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
          <Scale className="h-4 w-4 text-brand-600" />
          <span>Rules & Guidelines</span>
        </div>
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">Terms & Conditions</h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Welcome to Shorelume Tech. By accessing or using our platform, you agree to comply with the following terms and conditions.
        </p>
      </div>

      {/* Main Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="premium-card p-6 space-y-2.5 shadow-sm">
            <div className="flex items-center space-x-2.5">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <h2 className="text-base font-bold text-[#002060] font-display">{section.title}</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{section.desc}</p>
          </div>
        ))}
      </div>

      {/* Prohibited Activities */}
      <div className="premium-card p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center space-x-3 text-red-500">
          <AlertOctagon className="h-5 w-5" />
          <h2 className="text-lg font-bold font-display text-[#002060]">Prohibited Activities</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">Users must not perform any of the following activities on our platform:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prohibited.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-slate-655 text-xs sm:text-sm">
              <CheckCircle2 className="h-4 w-4 text-red-500/80 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limitation of Liability & Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="premium-card p-6 space-y-2 shadow-sm">
          <h3 className="text-sm font-bold text-[#002060] uppercase tracking-wider font-display border-b border-slate-100 pb-1.5">Limitation of Liability</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Shorelume Tech is not responsible for indirect damages resulting from platform usage.
          </p>
        </div>

        <div className="premium-card p-6 space-y-2 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#002060] uppercase tracking-wider font-display flex items-center space-x-2 border-b border-slate-100 pb-1.5">
              <RefreshCw className="h-4 w-4 text-brand-655" />
              <span>Updates to Terms</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may update these terms periodically. Continued use of the platform indicates acceptance of updated terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
