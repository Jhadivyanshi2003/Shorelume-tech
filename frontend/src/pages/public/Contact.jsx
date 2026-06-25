import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/shorelume-tech-a52b8a412?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Twitter/X', icon: Twitter, href: 'https://twitter.com' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative">
      {/* Decorative Glow */}
      <div className="glow-blur glow-secondary w-[300px] h-[300px] bottom-10 right-10" />
      <div className="glow-blur glow-primary w-[300px] h-[300px] top-10 left-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-700">
          <MessageSquare className="h-4 w-4 text-brand-600" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl font-display font-extrabold text-[#002060]">Contact Us</h1>
        <p className="text-slate-600">
          We’d love to hear from you! Whether you have questions about courses, need technical support, or want to share feedback, our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        {/* Info Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="premium-card p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#002060] font-display border-b border-slate-100 pb-3">Contact Information</h3>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-500/10 rounded-xl text-brand-600 flex-shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Address</p>
                  <p className="text-sm text-slate-600 pt-0.5">
                    Sec 17, noida
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-500/10 rounded-xl text-brand-600 flex-shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:shorelumetech@gmail.com" className="text-sm text-slate-600 hover:text-brand-600 transition-colors pt-0.5 block font-semibold">
                    shorelumetech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-500/10 rounded-xl text-brand-600 flex-shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:+919811308982" className="text-sm text-slate-600 hover:text-brand-600 transition-colors pt-0.5 block font-semibold">
                    +91 9811308982
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-500/10 rounded-xl text-brand-600 flex-shrink-0 mt-0.5">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Website</p>
                  <a href="http://www.shorelumetech.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-brand-600 transition-colors pt-0.5 block font-semibold">
                    www.shorelumetech.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="premium-card p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#002060] font-display border-b border-slate-100 pb-3">Office Hours</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-500/10 rounded-xl text-brand-600 flex-shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Monday – Friday</span>
                    <span className="text-slate-700 font-bold">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Saturday</span>
                    <span className="text-slate-700 font-bold">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Sunday</span>
                    <span className="text-red-500/80 font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className="premium-card p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#002060] uppercase tracking-wider font-display border-b border-slate-100 pb-2">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 hover:border-brand-500/25 transition-all text-xs font-semibold"
                  >
                    <Icon className="h-4 w-4 text-brand-600" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Message Form Column */}
        <div className="lg:col-span-3 premium-card p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#002060] font-display">Contact Form</h3>
              <p className="text-xs text-slate-500 mt-1">Send us a direct message and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-brand-600/20"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
