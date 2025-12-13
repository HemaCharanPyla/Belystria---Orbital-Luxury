import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionId } from '../../types';
import { MARKET_DATA } from '../../constants';
import { Download } from 'lucide-react';

const Market: React.FC = () => {
  return (
    <section id={SectionId.MARKET} className="py-24 bg-space-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
           <h2 className="font-serif text-4xl text-white mb-4">Market Opportunity</h2>
           <p className="text-gray-400">The dawn of the orbital economy.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg text-white font-bold mb-6">Space Tourism Market Size Projection (Billions USD)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MARKET_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', color: '#f3f4f6' }}
                    itemStyle={{ color: '#fbbf24' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#fbbf24" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Data aggregated from UBS, Morgan Stanley, and internal analysis.</p>
          </div>

          {/* Info Side */}
          <div className="bg-space-900 p-8 rounded-xl border border-white/10 flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-white mb-4">Investment Prospectus</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Belystria offers a unique opportunity to enter the $47B space tourism market at the ground floor. 
              Our modular architecture allows for scalable expansion as demand grows.
            </p>
            <button className="flex items-center justify-center w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition-colors">
              <Download className="mr-2 h-5 w-5" />
              Download Series A Deck
            </button>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
               <div className="mb-4">
                 <h4 className="text-white font-bold text-sm uppercase">Target Demographic</h4>
                 <p className="text-gray-500 text-sm">UHNWIs, Institutional Researchers, Governments</p>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm uppercase">Revenue Model</h4>
                 <p className="text-gray-500 text-sm">Ticket Sales, Research Leases, Media Rights</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;