
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronRight, ShieldCheck, Globe, Navigation2 } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

// 3D Solar System Component
const CosmicBackground = () => {
  const orbitsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitsRef.current) {
      orbitsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#f59e0b" />
      
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0.5} fade speed={1} />
      
      <group ref={orbitsRef}>
        {/* The Sun / Central Star */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[2.5, 64, 64]} />
            <MeshDistortMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={2}
              distort={0.3}
              speed={2}
            />
          </mesh>
        </Float>

        {/* Orbital Rings */}
        {[8, 14, 22, 32].map((radius, i) => (
          <group key={i}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius, radius + 0.05, 128]} />
              <meshBasicMaterial color="white" transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
            
            {/* Small Stylized Planets / Nodes */}
            <mesh position={[Math.cos(i) * radius, 0, Math.sin(i) * radius]}>
              <sphereGeometry args={[0.3 + (i * 0.1), 32, 32]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#22d3ee" : "#f8fafc"} emissive={i % 2 === 0 ? "#22d3ee" : "#f8fafc"} emissiveIntensity={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={10} 
        maxDistance={50} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
    </>
  );
};

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'loading' | 'swipe' | 'zoom'>('loading');
  const [swipeX, setSwipeX] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStage('swipe'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchStart.current = clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStart.current !== null) {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const delta = clientX - touchStart.current;
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
          <p className="text-gold-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Initialising Interstellar Link</p>
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
      className={`fixed inset-0 z-[100] bg-black transition-all duration-[1500ms] ease-in overflow-hidden ${stage === 'zoom' ? 'scale-[20] opacity-0 pointer-events-none' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          {/* Fix: Removed invalid shadowScale prop and enabled standard shadows */}
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 15, 30]} />
            <CosmicBackground />
          </Canvas>
        </Suspense>
      </div>

      {/* Interactive UI Overlays */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pointer-events-none">
        
        {/* 3D Hint */}
        <div className="absolute top-12 flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[9px] text-gray-400 uppercase tracking-[0.4em] font-black animate-pulse">
          <Navigation2 className="w-3 h-3 text-gold-400" />
          3D Navigation Active
        </div>

        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-[0.2em] mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">BELYSTRIA</h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6"></div>
          <p className="text-gold-500/80 uppercase tracking-[0.4em] text-[10px] font-bold">Orbital Boarding Protocol</p>
        </div>

        <div 
          className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] w-full max-w-sm flex flex-col items-center shadow-2xl transition-transform duration-200 pointer-events-auto"
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
