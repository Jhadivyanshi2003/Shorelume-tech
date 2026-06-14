import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Faqs = () => {
  const faqsList = [
    {
      q: '1. How do I enroll in a course?',
      a: 'Simply create an account, browse available courses, and click the enroll button.'
    },
    {
      q: '2. Are the courses self-paced?',
      a: 'Yes, most courses are self-paced so you can learn according to your schedule.'
    },
    {
      q: '3. Will I receive a certificate?',
      a: 'Yes, certificates are provided upon successful course completion.'
    },
    {
      q: '4. Can I access courses on mobile devices?',
      a: 'Yes, Shorelume Tech is accessible on desktops, tablets, and smartphones.'
    },
    {
      q: '5. What payment methods are accepted?',
      a: 'We accept major credit/debit cards and selected online payment methods.'
    },
    {
      q: '6. How can I contact support?',
      a: 'You can contact our support team through email or the Contact Us page.'
    },
    {
      q: '7. Can I request a refund?',
      a: 'Refund policies may vary depending on the course. Please review the course details for refund eligibility.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
      {/* Glow background decorations */}
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-10 left-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
          <HelpCircle className="h-4 w-4 text-brand-600" />
          <span>Common Queries</span>
        </div>
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">Frequently Asked Questions</h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Find answers to the questions we get asked most about enrollments, courses, pacing, and support.
        </p>
      </div>

      {/* FAQs list accordion */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqsList.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="premium-card overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base text-[#002060] pr-4">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-brand-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 border-t border-slate-100 pt-4 bg-slate-50/50 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Card - dark navy flyer banner style */}
      <div className="bg-gradient-to-br from-[#002060] to-[#082146] border border-brand-500/20 p-8 rounded-2xl text-center space-y-4 shadow-xl max-w-xl mx-auto text-white">
        <MessageSquare className="h-8 w-8 text-brand-400 mx-auto" />
        <h3 className="text-lg font-bold text-white font-display font-extrabold">Still Have Questions?</h3>
        <p className="text-xs sm:text-sm text-slate-205 max-w-md mx-auto">
          We’d love to hear from you. If you didn't find the answers you're looking for, feel free to drop our support team a line.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
