import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      items: [
        'Name and contact details',
        'Course progress and learning activity',
        'Device and browser information'
      ],
      icon: Eye
    },
    {
      title: 'How We Use Your Information',
      items: [
        'Provide and improve our services',
        'Personalize your learning experience',
        'Process payments and enrollments',
        'Send important updates and notifications',
        'Improve customer support'
      ],
      icon: CheckCircle
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
      {/* Glow background decorations */}
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-10 left-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
          <Shield className="h-4 w-4 text-brand-600" />
          <span>Security & Consent</span>
        </div>
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">Privacy Policy</h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          At Shorelume Tech, we value your privacy and are committed to protecting your personal information.
        </p>
      </div>

      {/* Lists sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx} className="premium-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="p-2 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-bold text-[#002060] font-display">{section.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                    <span className="h-1.5 w-1.5 bg-brand-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Plain Text sections */}
      <div className="premium-card divide-y divide-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 space-y-2">
          <h3 className="text-base font-bold text-[#002060] font-display">Data Protection</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We implement appropriate security measures to protect your personal data from unauthorized access, disclosure, or misuse.
          </p>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="text-base font-bold text-[#002060] font-display">Third-Party Services</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We may use trusted third-party services for payment processing, analytics, and communication tools.
          </p>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="text-base font-bold text-[#002060] font-display">Cookies</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Shorelume Tech uses cookies to enhance user experience and analyze website traffic.
          </p>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="text-base font-bold text-[#002060] font-display">Your Rights</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You may request access, correction, or deletion of your personal data at any time.
          </p>
        </div>
      </div>

      {/* Contact Section - dark navy flyer banner style */}
      <div className="bg-gradient-to-br from-[#002060] to-[#082146] border border-brand-500/20 p-8 rounded-2xl text-center space-y-3 shadow-xl max-w-xl mx-auto text-white">
        <Lock className="h-8 w-8 text-brand-400 mx-auto" />
        <h3 className="text-lg font-bold text-white font-display">Contact Us About Privacy</h3>
        <p className="text-xs sm:text-sm text-slate-200">
          If you have any privacy-related questions, contact us at:
        </p>
        <a href="mailto:privacy@shorelumetech.com" className="inline-block text-brand-300 font-semibold hover:text-brand-200 transition-colors text-sm">
          privacy@shorelumetech.com
        </a>
      </div>
    </div>
  );
};

export default Privacy;
