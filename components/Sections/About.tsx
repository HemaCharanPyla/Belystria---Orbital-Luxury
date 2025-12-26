
import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { Clock, Navigation, Zap, Globe, Activity, Crosshair, Radio } from 'lucide-react';

const About: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    lat: 28.5721,
    lng: -80.6480,
    alt: 400.00,
    vel: 7.67,
    rpm: 1.94,
    tanVel: 18.3,
    angVel: 0.20
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        lat: (prev.lat + 0.00012) % 90,
        lng: (prev.lng + 0.00025) % 180,
        alt: 400 + (Math.sin(Date.now() / 2000) * 0.1),
        vel: 7.67 + (Math.random() * 0.002 - 0.001),
        rpm: 1.94 + (Math.random() * 0.004 - 0.002),
        tanVel: 18.3 + (Math.random() * 0.02 - 0.01),
        angVel: 0.20 + (Math.random() * 0.001 - 0.0005)
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-24 bg-space-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h2 className="text-gold-400 uppercase tracking-widest text-[10px] font-bold mb-4 border border-gold-500/20 inline-block px-3 py-1 rounded-full bg-gold-500/5">Telemetry Node 01</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Real-Time Orbital Dynamics</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                The Belystria habitat is currently synchronized to <strong>0.38g (Martian Gravity)</strong>. 
                Our rotation parameters are precisely tuned to eliminate Coriolis-induced motion sickness while providing 18.3 m/s of tangential velocity at the rim.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: <Zap className="h-6 w-6 text-gold-400" />, label: "Orbital Vel", value: `${telemetry.vel.toFixed(2)} km/s` },
                { icon: <Clock className="h-6 w-6 text-cyan-400" />, label: "Rotation Speed", value: `${telemetry.rpm.toFixed(2)} RPM` },
                { icon: <Navigation className="h-6 w-6 text-purple-400" />, label: "Angular Vel", value: `${telemetry.angVel.toFixed(2)} rad/s` },
                { icon: <Globe className="h-6 w-6 text-blue-400" />, label: "Tangential Vel", value: `${telemetry.tanVel.toFixed(1)} m/s` }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl hover:border-gold-400/50 transition-all group">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-xl md:text-2xl font-bold text-white font-mono">{item.value}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1 font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual/Orbital Map Simulation */}
          <div className="relative aspect-square w-full max-w-[500px] mx-auto order-1 lg:order-2">
             <div className="absolute inset-0 bg-space-900 rounded-full border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-950/40">
                
                {/* HUD Elements */}
                <div className="absolute inset-0 z-20 pointer-events-none border-[20px] border-white/[0.02] rounded-full"></div>
                <div className="absolute inset-0 z-20 pointer-events-none border-[1px] border-cyan-500/10 rounded-full m-4"></div>
                
                {/* Earth Container */}
                <div className="absolute w-[55%] h-[55%] z-10 rounded-full animate-[spin_300s_linear_infinite]">
                  <div className="w-full h-full rounded-full shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.9),0_0_80px_rgba(59,130,246,0.2)] overflow-hidden bg-blue-900 border border-white/5">
                     <img 
                       src="https://images.unsplash.com/photo-1614730341194-75c60740a073?q=80&w=600&auto=format&fit=crop" 
                       alt="Earth View"
                       className="w-full h-full object-cover opacity-60 scale-150 grayscale-[0.2]"
                     />
                  </div>
                </div>

                {/* Tracking Circle */}
                <div className="absolute w-[85%] h-[85%] border border-dashed border-gold-500/20 rounded-full animate-[spin_120s_linear_infinite] z-20">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                      <div className="absolute w-full h-full bg-gold-500/10 rounded-full animate-ping"></div>
                      <Radio className="w-4 h-4 text-gold-500" />
                   </div>
                </div>

                {/* Telemetry Floating HUDs */}
                <div className="absolute top-[8%] right-[8%] z-30 scale-[0.85] md:scale-100 origin-top-right">
                  <div className="bg-black/80 backdrop-blur-2xl border border-gold-500/40 p-5 rounded-2xl shadow-2xl w-48 font-mono">
                    <div className="flex items-center justify-between mb-4 border-b border-gold-500/20 pb-2">
                      <span className="text-[10px] font-bold text-gold-400 tracking-widest uppercase">LIVE POS</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gold-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-gold-500 rounded-full animate-pulse delay-75"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-500 uppercase">Latitude</span>
                        <span className="text-white tabular-nums">{telemetry.lat.toFixed(4)}° N</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 uppercase">Longitude</span>
                        <span className="text-white tabular-nums">{telemetry.lng.toFixed(4)}° W</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-gray-500 uppercase">Altitude</span>
                        <span className="text-cyan-400 tabular-nums">{telemetry.alt.toFixed(2)} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[8%] left-[8%] z-30 scale-[0.85] md:scale-100 origin-bottom-left">
                  <div className="bg-black/80 backdrop-blur-2xl border border-cyan-500/40 p-5 rounded-2xl shadow-2xl w-48 font-mono">
                    <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-2">
                      <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">HAB PHYSICS</span>
                      <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                    </div>
                    
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-500 uppercase">Rim G</span>
                        <span className="text-gold-400">0.38 G</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 uppercase">Rotation</span>
                        <span className="text-white tabular-nums">{telemetry.rpm.toFixed(2)} RPM</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-gray-500 uppercase">Tangential</span>
                        <span className="text-white tabular-nums">{telemetry.tanVel.toFixed(1)} m/s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Target */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10">
                  <Crosshair className="w-64 h-64 text-white" strokeWidth={0.5} />
                </div>

                {/* Master Signal Badge */}
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 z-40">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-gold-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] transform -translate-y-4">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Signal Locked | LEO-Node-01</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
