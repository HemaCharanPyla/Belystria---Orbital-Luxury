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

  // Simulate real-time telemetry data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        lat: (prev.lat + 0.0005) % 90,
        lng: (prev.lng + 0.001) % 180,
        alt: 400 + (Math.sin(Date.now() / 1000) * 0.5), // Subtle sine wave altitude fluctuation
        vel: 27600 + Math.floor(Math.random() * 12 - 6) // Micro variations in velocity
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={SectionId.ABOUT} className="py-24 bg-space-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-2">Our Vision</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">A Sanctuary Beyond Borders</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Belystria is the culmination of decades of aerospace research, leveraging <strong>NASA's TransHab architecture</strong> and advanced life support systems. 
                Situated in Low Earth Orbit, we offer a safe, luxurious, and transformative environment where the boundaries 
                of Earth fade away, replaced by the infinite majesty of the cosmos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg hover:border-gold-400/50 transition-colors">
                <Clock className="h-8 w-8 text-cyan-400 mb-4" />
                <h4 className="text-2xl font-bold text-white">92 min</h4>
                <p className="text-sm text-gray-500 mt-1">Full Orbital Period</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg hover:border-gold-400/50 transition-colors">
                <Zap className="h-8 w-8 text-gold-400 mb-4" />
                <h4 className="text-2xl font-bold text-white">7.67 km/s</h4>
                <p className="text-sm text-gray-500 mt-1">Orbital Velocity</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg hover:border-gold-400/50 transition-colors">
                <Globe className="h-8 w-8 text-blue-400 mb-4" />
                <h4 className="text-2xl font-bold text-white">16</h4>
                <p className="text-sm text-gray-500 mt-1">Sunrises Per Day</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg hover:border-gold-400/50 transition-colors">
                <Navigation className="h-8 w-8 text-purple-400 mb-4" />
                <h4 className="text-2xl font-bold text-white">400 km</h4>
                <p className="text-sm text-gray-500 mt-1">Altitude (LEO)</p>
              </div>
            </div>
          </div>

          {/* Visual/Orbital Map Simulation */}
          <div className="relative h-[600px] bg-space-900 rounded-full border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-900/20 group">
             
             {/* Tech Overlay Grid/Scanlines */}
             <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
             <div className="absolute inset-0 z-20 pointer-events-none border border-white/5 rounded-full"></div>

             {/* Earth Container (Slow Rotation) */}
             <div className="absolute w-[300px] h-[300px] z-10 rounded-full animate-[spin_120s_linear_infinite]">
               <div className="w-full h-full rounded-full shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1614730341194-75c60740a073?q=80&w=600&auto=format&fit=crop" 
                    alt="Earth Blue Marble"
                    className="w-full h-full object-cover opacity-90 scale-125"
                  />
               </div>
             </div>
             
             {/* Atmosphere Glow */}
             <div className="absolute w-[340px] h-[340px] bg-blue-500/10 rounded-full blur-2xl z-0"></div>

             {/* Orbit Path (Faster Rotation) */}
             <div className="absolute w-[500px] h-[500px] border border-dashed border-white/20 rounded-full animate-[spin_40s_linear_infinite] z-20">
                {/* Station Icon on Path */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                   {/* Pulsing Marker */}
                   <div className="absolute w-full h-full bg-gold-500/30 rounded-full animate-ping"></div>
                   <div className="w-3 h-3 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)]"></div>
                </div>
             </div>

             {/* Telemetry HUD - Top Right */}
             <div className="absolute top-8 right-8 z-30">
               <div className="bg-space-950/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.1)] w-48">
                 <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                   <Activity className="w-4 h-4 text-cyan-400" />
                   <span className="text-xs font-bold text-cyan-400 tracking-widest">LIVE TELEMETRY</span>
                 </div>
                 
                 <div className="space-y-2 font-mono text-xs">
                   <div className="flex justify-between">
                     <span className="text-gray-500">LAT</span>
                     <span className="text-white">{telemetry.lat.toFixed(4)}° N</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">LNG</span>
                     <span className="text-white">{telemetry.lng.toFixed(4)}° W</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">ALT</span>
                     <span className="text-gold-400">{telemetry.alt.toFixed(2)} km</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">VEL</span>
                     <span className="text-white">{telemetry.vel.toLocaleString()} km/h</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Status Badge - Bottom Center */}
             <div className="absolute bottom-8 left-0 right-0 text-center z-30">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                 <span className="text-xs font-medium text-green-400 tracking-wider">SIGNAL LOCKED</span>
               </div>
             </div>

             {/* Crosshairs decorative */}
             <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] text-white/5 z-0" strokeWidth={0.5} />

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;