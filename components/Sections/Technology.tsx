import React from 'react';
import { SectionId } from '../../types';
import { TECHNICAL_SPECS } from '../../constants';

const Technology: React.FC = () => {
  return (
    <section id={SectionId.TECHNOLOGY} className="py-24 bg-space-950 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Engineering the Future</h2>
          <p className="text-gray-400 max-w-3xl text-lg">
            Building on NASA's pioneering concepts for the Von Braun rotating torus and TransHab modules, Belystria generates 0.38G artificial gravity 
            at the outer rim. This hybrid architecture combines proven ISS life support with next-generation commercial materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Interactive Torus Diagram (CSS/SVG) */}
          <div className="relative h-[500px] flex items-center justify-center bg-space-900/50 rounded-xl border border-white/5 backdrop-blur">
            <div className="relative w-80 h-80">
              {/* Central Hub (Static) */}
              <div className="absolute inset-0 m-auto w-20 h-20 bg-gray-200 rounded-full z-20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="text-xxs font-bold text-black uppercase text-center">Zero-G<br/>Hub</span>
              </div>
              
              {/* Spokes */}
              <div className="absolute inset-0 m-auto w-full h-full animate-spin-slow">
                 <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-700 -translate-y-1/2"></div>
                 <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-700 -translate-x-1/2"></div>
              </div>

              {/* Outer Ring (Rotating) */}
              <div className="absolute inset-0 m-auto w-full h-full border-[24px] border-gray-800 rounded-full animate-spin-slow shadow-xl">
                 {/* Habitat Modules on Ring */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[12px] w-12 h-6 bg-cyan-900/50 rounded border border-cyan-400"></div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[12px] w-12 h-6 bg-cyan-900/50 rounded border border-cyan-400"></div>
                 <div className="absolute left-0 top-1/2 -translate-x-[12px] -translate-y-1/2 w-6 h-12 bg-cyan-900/50 rounded border border-cyan-400"></div>
                 <div className="absolute right-0 top-1/2 translate-x-[12px] -translate-y-1/2 w-6 h-12 bg-cyan-900/50 rounded border border-cyan-400"></div>
              </div>
              
              {/* Gravity Gradient Indicator */}
              <div className="absolute -bottom-16 w-full text-center">
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-2"></div>
                <p className="text-xs text-blue-300">Gravity increases from center (0G) to rim (0.38G)</p>
              </div>
            </div>
          </div>

          {/* Specs Table */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-serif text-white mb-6">Technical Specifications</h3>
            <div className="space-y-4">
              {TECHNICAL_SPECS.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0 hover:bg-white/5 px-2 transition-colors rounded">
                  <span className="text-gray-400 font-medium">{spec.label}</span>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold text-lg">{spec.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{spec.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-white font-bold mb-2">Systems</h4>
              <p className="text-sm text-gray-400">
                Life Support: NASA ECLSS with 98% Water Recycling <br/>
                Power: 450kW Thin-Film Solar Array (ISS Derivative) <br/>
                Shielding: Next-Gen Whipple Shielding & Kevlar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;