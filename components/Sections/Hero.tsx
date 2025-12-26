
import React, { useEffect, useState, useMemo } from 'react';
import { SectionId } from '../../types';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Memoize stars to prevent re-renders of randomized positions
  const farStars = useMemo(() => [...Array(80)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  })), []);

  const midStars = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3
  })), []);

  return (
    <section id={SectionId.HOME} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Layer 1: Orbital Earth Image with Parallax Drift */}
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ 
            transform: `scale(1.1) translateY(${offset * 0.15}px)`,
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop" 
            alt="Earth from Orbit" 
            className="w-full h-full object-cover opacity-50 grayscale-[0.2] brightness-75 animate-[slowZoom_90s_linear_infinite]"
          />
        </div>

        {/* Layer 2: Drifting Nebulae */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[140px] animate-[cosmicDrift_25s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-[-15%] right-[-5%] w-[60%] h-[60%] bg-purple-700/10 rounded-full blur-[120px] animate-[cosmicDrift_30s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[100px] animate-[pulse_20s_ease-in-out_infinite_2s]"></div>
        </div>

        {/* Layer 3: Multi-Layer Parallax Starfield */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Far Stars (Slower) */}
          <div className="absolute inset-0" style={{ transform: `translateY(${offset * 0.05}px)` }}>
            {farStars.map(star => (
              <div 
                key={`far-${star.id}`} 
                className="absolute bg-white rounded-full opacity-40 shadow-[0_0_2px_white]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `twinkle ${star.duration}s infinite ${star.delay}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Mid Stars (Faster) */}
          <div className="absolute inset-0" style={{ transform: `translateY(${offset * 0.12}px)` }}>
            {midStars.map(star => (
              <div 
                key={`mid-${star.id}`} 
                className="absolute bg-blue-100 rounded-full opacity-60 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `twinkle ${star.duration}s infinite ${star.delay}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Layer 4: Orbital Flare / Sunlight Simulation */}
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[50%] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 animate-[flare_12s_ease-in-out_infinite]"></div>

        {/* Layer 5: Shooting Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-white to-transparent h-[1px] w-32 opacity-0 animate-[shootingStar_15s_linear_infinite]"
              style={{
                top: `${10 + Math.random() * 60}%`,
                left: `${-20}%`,
                transform: `rotate(${20 + Math.random() * 10}deg)`,
                animationDelay: `${i * 7.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Final Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/90 via-transparent to-space-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/10 text-gold-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-10 animate-[fadeInDown_1.2s_ease-out]">
          <Sparkles className="w-4 h-4 animate-pulse" />
          The World's First Orbital Luxury Hotel
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-light text-white mb-8 leading-[1.1] animate-[fadeInScale_1.4s_ease-out]">
          Experience the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-gold-200 italic font-normal drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Overview Effect
          </span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-14 font-light leading-relaxed animate-[fadeIn_1.8s_ease-out_0.6s_both]">
          Ascend to 400km. Witness 16 sunrises a day. <br className="hidden md:block" />
          A sanctuary utilizing next-generation NASA technology.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-[fadeInUp_1.2s_ease-out_1s_both]">
          <button 
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-12 py-5 bg-gold-500 text-black font-bold tracking-[0.2em] uppercase transition-all overflow-hidden hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            <span className="relative z-10">Reserve Your Journey</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-30"></div>
          </button>
          
          <button 
            onClick={scrollToAbout}
            className="px-12 py-5 bg-white/5 border border-white/20 text-white hover:border-gold-400/50 hover:text-gold-400 hover:bg-white/10 font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-md"
          >
            Explore Project
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-[bounce_2.5s_infinite]">
        <span className="text-[9px] text-gray-500 uppercase tracking-[0.6em] font-black">Begin Exploration</span>
        <ArrowDown className="text-gold-500/40 h-5 w-5" />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes slowZoom {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes cosmicDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, 2%) scale(1.05); }
        }
        @keyframes flare {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.2; }
          50% { transform: translateX(5%) scale(1.1); opacity: 0.4; }
        }
        @keyframes shootingStar {
          0% { left: -20%; opacity: 0; transform: scaleX(1) rotate(20deg); }
          5% { opacity: 1; }
          12% { left: 120%; opacity: 0; transform: scaleX(4) rotate(20deg); }
          100% { left: 120%; opacity: 0; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
