
import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { Clock, Navigation, Zap, Globe, Activity, Crosshair } from 'lucide-react';

const About: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    lat: 28.5721,
    lng: -80.6480,
    alt: 400.00,
    vel: 27600
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        lat: (prev.lat + 0.0005) % 90,
        lng: (prev.lng + 0.001) % 180,
        alt: 400 + (Math.sin(Date.now() / 1000) * 0.5),
        vel: 27600 + Math.floor(Math.random() * 12 - 6)
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-24 bg-space-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h2 className="text-gold-400 uppercase tracking-widest text-[10px] font-bold mb-4 border border-gold-500/20 inline-block px-3 py-1 rounded-full bg-gold-500/5">Our Vision</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">A Sanctuary Beyond Borders</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Belystria is the culmination of decades of aerospace research, leveraging <strong>NASA's TransHab architecture</strong> and advanced life support systems. 
                Situated in Low Earth Orbit, we offer a safe, luxurious, and transformative environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: <Clock className="h-6 w-6 text-cyan-400" />, label: "Orbital Period", value: "92 min" },
                { icon: <Zap className="h-6 w-6 text-gold-400" />, label: "Velocity", value: "7.67 km/s" },
                { icon: <Globe className="h-6 w-6 text-blue-400" />, label: "Sunrises/Day", value: "16" },
                { icon: <Navigation className="h-6 w-6 text-purple-400" />, label: "Altitude", value: "400 km" }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl hover:border-gold-400/50 transition-all group">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-xl md:text-2xl font-bold text-white">{item.value}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual/Orbital Map Simulation - Enhanced for Mobile */}
          <div className="relative aspect-square w-full max-w-[500px] mx-auto order-1 lg:order-2">
             <div className="absolute inset-0 bg-space-900 rounded-full border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-950/40">
                
                {/* Tech Scanlines Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]"></div>
                
                {/* Earth Container */}
                <div className="absolute w-[50%] h-[50%] z-10 rounded-full animate-[spin_180s_linear_infinite]">
                  <div className="w-full h-full rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.3)] overflow-hidden bg-blue-900">
                     <img 
                       src="https://images.unsplash.com/photo-1614730341194-75c60740a073?q=80&w=600&auto=format&fit=crop" 
                       alt="Earth View"
                       className="w-full h-full object-cover opacity-80 scale-150"
                     />
                  </div>
                </div>

                {/* Orbit Path */}
                <div className="absolute w-[80%] h-[80%] border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite] z-20">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                      <div className="absolute w-full h-full bg-gold-500/20 rounded-full animate-ping"></div>
                      <div className="w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)]"></div>
                   </div>
                </div>

                {/* Telemetry HUD - Mobile Responsive */}
                <div className="absolute top-[10%] right-[10%] z-30 scale-75 md:scale-100 origin-top-right">
                  <div className="bg-space-950/90 backdrop-blur-xl border border-cyan-500/30 p-4 rounded-2xl shadow-2xl w-40">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span className="text-[9px] font-bold text-cyan-400 tracking-[0.2em] uppercase">Telemetry</span>
                    </div>
                    
                    <div className="space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-gray-500">LAT</span>
                        <span className="text-white">{telemetry.lat.toFixed(2)}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">LNG</span>
                        <span className="text-white">{telemetry.lng.toFixed(2)}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ALT</span>
                        <span className="text-gold-400">{telemetry.alt.toFixed(1)}km</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signal Badge */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-30">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-green-500/20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-bold text-green-400 tracking-widest uppercase">Signal Locked</span>
                  </div>
                </div>

                <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] text-white/[0.03] z-0" strokeWidth={0.5} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
