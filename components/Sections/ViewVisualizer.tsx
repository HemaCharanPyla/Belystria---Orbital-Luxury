
import React, { useState } from 'react';
import { SectionId } from '../../types';
import { generateSuiteView } from '../../services/geminiService';
import { Sparkles, Image as ImageIcon, Loader2, ArrowRight, Camera } from 'lucide-react';

const ViewVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setError(null);
    
    const imageUrl = await generateSuiteView(prompt);
    
    if (imageUrl) {
      setGeneratedImage(imageUrl);
    } else {
      setError("The orbital imaging system is experiencing solar interference. Please try a different request.");
    }
    setIsGenerating(false);
  };

  const suggestions = [
    "The Northern Lights over Scandinavia",
    "A sunrise over the Pacific Ocean",
    "The Sahara Desert from 400km",
    "City lights of Tokyo at midnight"
  ];

  return (
    <section id={SectionId.VISUALIZER} className="py-24 bg-space-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <Sparkles className="w-3 h-3" />
                Next-Gen Visualization
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Visualize Your <br />
                <span className="text-gold-400 italic">Personal Horizon</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Describe the view you wish to wake up to. Our onboard AI Imaging Core will simulate your personalized suite perspective using real-time orbital data.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A panoramic view of the Great Barrier Reef during high noon..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:border-gold-500 focus:outline-none transition-all resize-none h-32 backdrop-blur-md"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute bottom-4 right-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:hover:bg-gold-500 text-black p-3 rounded-xl transition-all"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => setPrompt(s)}
                    className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="relative aspect-video lg:aspect-square w-full">
            <div className="absolute inset-0 bg-space-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
              {generatedImage ? (
                <div className="relative w-full h-full group">
                  <img 
                    src={generatedImage} 
                    alt="Generated Orbital View" 
                    className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
                  />
                  <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none"></div>
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Camera className="w-3 h-3 text-gold-400" />
                    <span className="text-[9px] text-white font-black uppercase tracking-widest">Belystria Lens 01</span>
                  </div>
                  <button 
                    onClick={() => setGeneratedImage(null)}
                    className="absolute bottom-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    Reset View
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Awaiting Telemetry</h4>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Input your desired coordinates or scenery to engage the exterior imaging sensors.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* UI Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-500/20 rounded-tr-3xl pointer-events-none"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold-500/20 rounded-bl-3xl pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ViewVisualizer;
