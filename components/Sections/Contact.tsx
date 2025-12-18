
import React, { useState } from 'react';
import { SectionId } from '../../types.ts';
import { Mail, Copy, Check, ExternalLink, RefreshCcw, Send, Rocket } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'Voyager Class ($2.5M - 3 Days)',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'redirecting' | 'fallback'>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const recipient = "belystriathespacehotel@gmail.com";
  const subject = `Belystria Reservation: ${formData.tier}`;
  const body = `RESERVATION REQUEST DETAILS
------------------------------------------------
Full Name: ${formData.name}
Contact Email: ${formData.email}
Requested Tier: ${formData.tier}

GUEST MESSAGE:
"${formData.message}"

------------------------------------------------
Sent via Belystria Orbital Luxury Reservation Portal.`;

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('redirecting');
    window.location.href = mailtoUrl;
    setTimeout(() => {
      setStatus('fallback');
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-gradient-to-b from-space-950 to-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reservation Header Card */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] uppercase tracking-widest font-bold mb-6">
            <Rocket className="w-3 h-3" />
            Arrival Confirmed
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">Finalize Your Ascent</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            You have crossed the Kármán line. The final step of your journey begins with a formal reservation inquiry.
          </p>
        </div>

        <div className="relative">
          {status === 'fallback' ? (
            <div className="bg-space-900 border border-gold-500/30 p-8 md:p-12 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-10 h-10 text-gold-500" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">Channel Ready</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Automatic redirect failed. Please use one of the secure orbital transmission methods below.
              </p>
              
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <a href={mailtoUrl} className="flex items-center justify-center gap-3 bg-gold-500 text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-gold-400 transition-all">
                  <Send className="w-5 h-5" /> Open System Mail
                </a>
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white/5 text-white font-bold py-4 rounded-xl border border-white/20 uppercase tracking-widest hover:bg-white/10 transition-all">
                  <ExternalLink className="w-5 h-5" /> Web Gmail
                </a>
                <button onClick={copyToClipboard} className="text-gray-500 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2 mt-4">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy Payload"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-space-900 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl transition-all relative">
              {status === 'redirecting' && (
                <div className="absolute inset-0 bg-space-950/90 z-20 flex flex-col items-center justify-center rounded-3xl animate-in fade-in duration-300">
                  <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gold-400 font-bold uppercase tracking-widest text-xs">Transmitting...</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-space-950 border border-white/10 rounded-xl p-4 text-white focus:border-gold-500 focus:outline-none transition-all" placeholder="Guest Identifier" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Orbital Email</label>
                  <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full bg-space-950 border border-white/10 rounded-xl p-4 text-white focus:border-gold-500 focus:outline-none transition-all" placeholder="user@domain.com" />
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Mission Class</label>
                <select name="tier" value={formData.tier} onChange={handleChange} className="w-full bg-space-950 border border-white/10 rounded-xl p-4 text-white focus:border-gold-500 focus:outline-none transition-all appearance-none cursor-pointer">
                  <option value="Voyager Class ($2.5M - 3 Days)">Voyager Class ($2.5M - 3 Days)</option>
                  <option value="Pioneer Class ($5M - 7 Days)">Pioneer Class ($5M - 7 Days)</option>
                  <option value="Legacy Suite ($12M - 7 Days)">Legacy Suite ($12M - 7 Days)</option>
                </select>
              </div>

              <div className="mb-8 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Manifest Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-space-950 border border-white/10 rounded-xl p-4 text-white focus:border-gold-500 focus:outline-none transition-all" placeholder="Inquiry details..."></textarea>
              </div>

              <button type="submit" className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold py-5 rounded-xl uppercase tracking-widest hover:from-gold-400 hover:to-gold-500 transition-all transform hover:scale-[1.01] shadow-xl">
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
