
import React, { useRef, Suspense, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Grid, 
  useGLTF,
  Stage,
  Center
} from '@react-three/drei';
import * as THREE from 'three';
import { SectionId } from '../../types';
import { TECHNICAL_SPECS } from '../../constants';
import { Shield, Cpu, RotateCcw, Info, Loader2, AlertCircle, Navigation2 } from 'lucide-react';

/**
 * STABLE ASSET RESOLUTION:
 * 1. Previous URLs (Supabase, GitHub Three.js dev branch) were unstable or returned 404.
 * 2. Switched to Google's 'Astronaut.glb' - a production-grade, CORS-enabled orbital asset.
 * 3. This model serves as the Digital Twin for the Belystria standard-issue EVA suits.
 */
// Fix: Providing a valid, public GLB URL for the Astronaut model to ensure the component renders correctly.
const MODEL_URL = 'https://raw.githubusercontent.com/google/model-viewer/master/packages/shared-assets/models/Astronaut.glb';

interface ErrorBoundaryProps {
  // Fix: children must be optional or explicitly handled to satisfy React 18 type checks in some environments.
  children?: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fix: Correctly extending React.Component and ensuring proper property initialization to resolve errors where 'state' and 'props' were reported as missing.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model Error:", error, errorInfo);
  }

  render() {
    // Fix: Accessing state and props via 'this' to handle the error boundary logic.
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const AssetLoader = () => {
  const { scene } = useGLTF(MODEL_URL);
  
  return (
    <Center top>
      <primitive 
        object={scene} 
        scale={3.5} 
        rotation={[0, 0, 0]} 
      />
    </Center>
  );
};

const Technology: React.FC = () => {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <section id={SectionId.TECHNOLOGY} className="py-24 bg-space-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-4">
              <Cpu className="w-3 h-3" />
              Engineering Core
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Orbital Engineering</h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Interact with the Belystria EVA Digital Twin. This mesh represents the station's mission-critical hardware and individual life support systems.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className={`p-3 border rounded-full transition-all flex items-center gap-2 ${isRotating ? 'bg-gold-500/10 border-gold-500 text-gold-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
              title="Toggle Auto-Rotation"
            >
              <RotateCcw className={`w-5 h-5 ${isRotating ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest pr-2">{isRotating ? 'Rotating' : 'Static'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 relative h-[650px] bg-black/60 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
            
            <div className="absolute inset-0 z-0">
              <ErrorBoundary fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-space-950 p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-white font-serif text-xl mb-2">Simulation Failed</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    The 3D asset server is currently unreachable. Please check your network connection or try a different browser.
                  </p>
                </div>
              }>
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-space-950">
                     <div className="flex flex-col items-center gap-4">
                       <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
                       <div className="text-center">
                          <span className="text-[10px] text-gold-500 uppercase tracking-[0.4em] font-black block mb-2">Establishing Secure Link</span>
                          <span className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold">Downloading Orbital Geometry...</span>
                       </div>
                     </div>
                  </div>
                }>
                  <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 45 }}>
                    <color attach="background" args={['#020617']} />
                    
                    <Stage 
                      environment="city" 
                      intensity={0.6} 
                      shadows={{ type: 'contact', opacity: 0.7, blur: 2 }} 
                      adjustCamera={false}
                    >
                      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <AssetLoader />
                      </Float>
                    </Stage>

                    <OrbitControls 
                      enablePan={false} 
                      autoRotate={isRotating}
                      autoRotateSpeed={0.5}
                      makeDefault
                    />
                    
                    <Grid 
                      infiniteGrid 
                      fadeDistance={40} 
                      fadeStrength={5} 
                      sectionSize={3} 
                      sectionColor="#1e293b" 
                      cellColor="#0f172a" 
                      position={[0, -2, 0]}
                    />
                  </Canvas>
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Overlays */}
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-3 pointer-events-none">
              <div className="flex items-center gap-3 px-4 py-2 bg-black/50 border border-white/10 rounded-full backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Telemetry Status: NOMINAL</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
                 <Navigation2 className="w-3 h-3" />
                 <span className="text-[9px] uppercase tracking-widest font-black">Free Look Mode Active</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 z-10">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1 h-3 bg-gold-500 rounded-full"></div>
                   <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">Nav Protocol</p>
                </div>
                <p className="text-[10px] text-white/80 font-medium">Orbit: Left Mouse • Zoom: Scroll • Move: Right Mouse</p>
              </div>
            </div>

            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-[scanner_8s_linear_infinite] pointer-events-none"></div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Cpu className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <Info className="w-5 h-5 text-gold-500" />
                <h3 className="text-xl font-serif text-white uppercase tracking-wider">Asset Properties</h3>
              </div>
              
              <div className="space-y-4">
                {TECHNICAL_SPECS.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-4 last:border-0 group/item">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-black mb-1 group-hover/item:text-gold-500 transition-colors">{spec.label}</span>
                      <span className="text-white text-sm font-medium">{spec.detail}</span>
                    </div>
                    <span className="text-gold-400 font-mono font-bold text-lg">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-gold-500/5 hover:border-gold-500/20 transition-all cursor-pointer">
                  <Shield className="w-6 h-6 text-gray-400 mb-3 group-hover:text-gold-500 transition-colors" />
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-gray-300 transition-colors">Hull Integrity</span>
                  <span className="text-[10px] text-green-500 mt-1 font-mono">100%</span>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-all cursor-pointer">
                  <Cpu className="w-6 h-6 text-gray-400 mb-3 group-hover:text-cyan-500 transition-colors" />
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-gray-300 transition-colors">Node Sync</span>
                  <span className="text-[10px] text-cyan-500 mt-1 font-mono">ACTIVE</span>
               </div>
            </div>

            <div className="bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 p-8 rounded-[2rem] relative overflow-hidden">
               <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-gold-500" />
                  <h4 className="text-white text-sm font-black uppercase tracking-widest">Digital Twin Active</h4>
               </div>
               <p className="text-xs text-gray-400 leading-relaxed">
                 The 3D model above utilizes a standard GLTF interop layer. For real-time physical simulation, we suggest the <b>Pioneer Class</b> VR uplink.
               </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanner {
          0% { left: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Technology;
