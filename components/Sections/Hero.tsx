import React from 'react';
import { SectionId } from '../../types';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop" 
          alt="Earth from Orbit" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/80 via-space-950/40 to-space-950"></div>
        
        {/* Animated Particles/Stars Simulation */}
        <div className="absolute inset-0 opacity-50">
           <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
           <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
           <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-gold-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="text-gold-400 tracking-[0.3em] uppercase text-sm md:text-base mb-6 animate-float">
          The World's First Orbital Luxury Hotel
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight">
          Experience the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 italic">
            Overview Effect
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Ascend to 400km. Witness 16 sunrises a day. A sanctuary utilizing next-generation NASA technology.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black font-semibold rounded-none tracking-widest uppercase transition-all transform hover:scale-105"
          >
            Reserve Your Journey
          </button>
          <button 
            onClick={scrollToAbout}
            className="px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 font-semibold rounded-none tracking-widest uppercase transition-all backdrop-blur-sm"
          >
            Explore Project
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToAbout}>
        <ArrowDown className="text-white/50 h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;