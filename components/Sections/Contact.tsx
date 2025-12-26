
import React, { useState, useMemo } from 'react';
import { SectionId } from '../../types.ts';
import { MISSION_TIERS } from '../../constants.ts';
import { Mail, Copy, Check, ExternalLink, Send, Rocket, Sparkles, Star, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'voyager',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'redirecting' | 'fallback'>('idle');
  const [copied, setCopied] = useState(false);

  const selectedTier = useMemo(() => 
    MISSION_TIERS.find(t => t.id === formData.tier) || MISSION_TIERS[0]
  , [formData.tier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const recipient = "belystriathespacehotel@gmail.com";
  const subject = `Belystria Reservation: ${selectedTier.label} (${selectedTier.price})`;
  const body = `RESERVATION REQUEST DETAILS
------------------------------------------------
Full Name: ${formData.name}
Contact Email: ${formData.email}
Requested Tier: ${selectedTier.label}
Price: ${selectedTier.price}
Duration: ${selectedTier.duration}

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 relative">
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
              <form onSubmit={handleSubmit} className="bg-space-900 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all relative">
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
                  <div className="relative">
                    <select 
                      name="tier" 
                      value={formData.tier} 
                      onChange={handleChange} 
                      className="w-full bg-space-950 border border-white/10 rounded-xl p-4 text-white focus:border-gold-500 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      {MISSION_TIERS.map(t => (
                        <option key={t.id} value={t.id}>{t.label} ({t.price} — {t.duration})</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                      <Star className="w-4 h-4 text-gold-400" />
                    </div>
                  </div>
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

          {/* Details Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md animate-in slide-in-from-right-8 duration-700">
              <div className="flex items-center gap-3 text-gold-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Mission Benefits</span>
              </div>
              
              <div key={selectedTier.id} className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif text-white mb-2">{selectedTier.label}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-black text-gold-400">{selectedTier.price}</span>
                  <span className="text-gray-500 text-sm">/ guest</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {selectedTier.description}
                </p>

                <div className="space-y-4">
                  {selectedTier.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                      <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-3xl p-6 flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-2xl">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold mb-1">Orbital Assistance</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Have specific requirements? Our ground-based flight surgeons and mission planners are available 24/7 via the Concierge AI below.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
