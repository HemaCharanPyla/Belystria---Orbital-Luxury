import React, { useState } from 'react';
import { SectionId } from '../../types';

const Science: React.FC = () => {
  const [rpm, setRpm] = useState(2);
  // Radius fixed for Belystria but adjustable for demo physics
  const radius = 90; // 180m diameter -> 90m radius

  // a = r * w^2, where w is rad/s. 
  // w = rpm * (2*PI)/60
  // g = a / 9.81
  const calculateGravity = (r: number, revs: number) => {
    const w = revs * (2 * Math.PI) / 60;
    const accel = r * Math.pow(w, 2);
    return (accel / 9.81).toFixed(2);
  };

  const gravity = calculateGravity(radius, rpm);

  return (
    <section id={SectionId.SCIENCE} className="py-24 bg-space-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-white mb-4">The Science of Comfort</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Understanding how we recreate home 400km above the surface.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Why Rotate?</h3>
            <p className="text-gray-300">
              Long-term exposure to microgravity causes muscle atrophy and bone density loss. 
              By spinning the habitat, we generate <strong>centripetal force</strong> that pushes inhabitants 
              against the outer hull, simulating gravity.
            </p>
            <h3 className="text-2xl font-bold text-white">The Goldilocks Zone</h3>
            <p className="text-gray-300">
              Belystria is calibrated to 0.38G. This is enough to keep champagne in a glass and allow for 
              easy walking, but low enough to make you feel superhumanly strong and agile.
            </p>
            
            <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/30 mt-6">
               <h4 className="text-cyan-400 font-bold mb-2">Culinary Innovation</h4>
               <p className="text-sm text-gray-400">
                 Our aeroponic farms use 95% less water than Earth farming. Cellular agriculture allows us 
                 to print wagyu beef steaks in orbit without raising cattle.
               </p>
            </div>
          </div>

          {/* Calculator Demo */}
          <div className="bg-space-950 p-8 rounded-2xl shadow-2xl border border-white/10">
            <h4 className="text-xl text-white font-bold mb-6 border-b border-white/10 pb-4">Gravity Simulator</h4>
            
            <div className="mb-8 text-center">
              <div className="text-6xl font-serif text-gold-400 mb-2">{gravity} G</div>
              <p className="text-gray-500">Resulting Artificial Gravity</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-white mb-2">
                  <label>Rotation Speed (RPM)</label>
                  <span className="text-cyan-400">{rpm} RPM</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="6" 
                  step="0.1" 
                  value={rpm} 
                  onChange={(e) => setRpm(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  At {radius}m radius, increasing rotation drastically increases G-force. Belystria is optimized for ~2 RPM to prevent motion sickness.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Science;