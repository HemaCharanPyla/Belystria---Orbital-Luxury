import React, { useState } from 'react';
import { SectionId } from '../../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'Voyager Class ($2.5M - 3 Days)',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the email body
    const subject = `Belystria Reservation Inquiry: ${formData.tier}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Interest Tier: ${formData.tier}

Message:
${formData.message}

------------------------------------------------
Sent from Belystria Website Inquiry Form`;

    // Redirect to email client
    window.location.href = `mailto:hemacharanpyla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-gradient-to-b from-space-950 to-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Begin Your Ascent</h2>
        <p className="text-gray-400 mb-12 text-lg">
          Reservations for 2026-2027 are now open. Secure your place in history.
        </p>

        <form onSubmit={handleSubmit} className="bg-space-900 p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                type="text" 
                className="w-full bg-space-950 border border-white/20 rounded p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" 
                placeholder="Dr. Elena Fisher" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email" 
                className="w-full bg-space-950 border border-white/20 rounded p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" 
                placeholder="elena@example.com" 
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Interest Tier</label>
            <select 
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full bg-space-950 border border-white/20 rounded p-3 text-white focus:border-gold-400 focus:outline-none transition-colors appearance-none"
            >
              <option value="Voyager Class ($2.5M - 3 Days)">Voyager Class ($2.5M - 3 Days)</option>
              <option value="Pioneer Class ($5M - 7 Days)">Pioneer Class ($5M - 7 Days)</option>
              <option value="Legacy Suite ($12M - 7 Days)">Legacy Suite ($12M - 7 Days)</option>
              <option value="Investment Inquiry">Investment Inquiry</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4} 
              className="w-full bg-space-950 border border-white/20 rounded p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" 
              placeholder="I am interested in reserving the Earthlight Suite..."
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold py-4 rounded uppercase tracking-widest hover:from-gold-400 hover:to-gold-500 transition-all transform hover:scale-[1.01]">
            Submit Inquiry
          </button>
          
          <p className="text-xs text-center text-gray-600 mt-6">
            By submitting, you will be redirected to your email client to finalize the request.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;