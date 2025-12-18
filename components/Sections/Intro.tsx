
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Rocket, ShieldCheck, Globe } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'loading' | 'swipe' | 'zoom'>('loading');
  const [swipeX, setSwipeX] = useState(0);
  const touchStart = useRef<number | null>(null);
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 400;

  useEffect(() => {
    const timer = setTimeout(() => setStage('swipe'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStart.current = clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStart.current !== null) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = clientX - touchStart.current;
      // Only allow swiping to the right
      if (delta > 0) setSwipeX(Math.min(delta, 300));
    }
  };

  const handleTouchEnd = () => {
    if (swipeX > 150) {
      triggerLaunch();
    } else {
      setSwipeX(0);
    }
    touchStart.current = null;
  };

  const triggerLaunch = () => {
    setStage('zoom');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (stage === 'loading') {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-2 border-gold-500/10 rounded-full scale-110"></div>
          <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full scale-125"></div>
          <div className="absolute inset-0 border-t-2 border-gold-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-10 h-10 text-gold-500 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-gold-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Syncing Orbital Node</p>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 animate-[loadingBar_2.5s_ease-in-out]"></div>
          </div>
        </div>
        <style>{`
          @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black transition-all duration-[1500ms] ease-in overflow-hidden ${stage === 'zoom' ? 'scale-[15] opacity-0 pointer-events-none' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Cosmic Background: Solar System View */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_80%)]"></div>
        
        {/* Distant Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,0.8)]"></div>

        {/* Orbit Rings (Stylized Solar System) */}
        {[10, 20, 35, 50, 70].map((radius, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
            style={{ width: `${radius}vw`, height: `${radius}vw` }}
          ></div>
        ))}

        {/* Stars */}
        {[...Array(150)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5}px`,
              height: `${Math.random() * 1.5}px`,
              animation: `pulse ${3 + Math.random() * 5}s infinite`
            }}
          ></div>
        ))}
      </div>

      {/* Interactive Swipe UI */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-[0.2em] mb-4">BELYSTRIA</h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6"></div>
          <p className="text-gold-500/80 uppercase tracking-[0.4em] text-[10px] font-bold">Orbital Boarding Protocol</p>
        </div>

        <div 
          className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] w-full max-w-sm flex flex-col items-center shadow-2xl transition-transform duration-200"
          style={{ transform: `translateX(${swipeX}px)` }}
        >
          <div className="w-20 h-20 bg-gold-500/5 border border-gold-500/20 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 border border-gold-500/20 rounded-full animate-ping"></div>
            <ShieldCheck className="w-10 h-10 text-gold-500" />
          </div>
          
          <h2 className="text-white font-serif text-3xl mb-3 text-center">System Ready</h2>
          <p className="text-gray-400 text-sm text-center mb-10 leading-relaxed">
            Authorization payload complete. Swipe right to initialize interstellar ascent.
          </p>
          
          <div className="relative w-full h-16 bg-white/5 rounded-full flex items-center px-2 border border-white/10 group overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 bg-gold-500/10 transition-all duration-200" style={{ width: `${(swipeX/300) * 100}%` }}></div>
             <div 
               className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/30 cursor-pointer transition-transform duration-75 active:scale-95 z-10"
               style={{ transform: `translateX(${swipeX * 1.0}px)` }}
             >
               <ChevronRight className="w-6 h-6 text-black" />
             </div>
             <span className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold pointer-events-none group-hover:text-gold-400 transition-colors">
               Swipe to Launch
             </span>
          </div>
        </div>
      </div>

      {/* Hyper-Zoom Streaks */}
      {stage === 'zoom' && (
        <div className="absolute inset-0 z-50 pointer-events-none">
           {[...Array(40)].map((_, i) => (
             <div 
               key={i} 
               className="absolute bg-white opacity-0 animate-[hyperSpeed_1.2s_ease-in_forwards]"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 width: '2px',
                 height: '100px',
                 transform: `rotate(${Math.random() * 360}deg)`,
                 animationDelay: `${Math.random() * 0.5}s`
               }}
             ></div>
           ))}
        </div>
      )}
      
      <style>{`
        @keyframes hyperSpeed {
          0% { transform: scaleY(0) translateY(0); opacity: 0; }
          40% { transform: scaleY(5) translateY(200px); opacity: 0.8; }
          100% { transform: scaleY(15) translateY(800px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Intro;
