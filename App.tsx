
import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar.tsx';
import Footer from './components/Layout/Footer.tsx';
import Hero from './components/Sections/Hero.tsx';
import About from './components/Sections/About.tsx';
import Experience from './components/Sections/Experience.tsx';
import ViewVisualizer from './components/Sections/ViewVisualizer.tsx';
import Science from './components/Sections/Science.tsx';
import Market from './components/Sections/Market.tsx';
import Contact from './components/Sections/Contact.tsx';
import Intro from './components/Sections/Intro.tsx';

function App() {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  return (
    <div className="min-h-screen bg-space-950 text-white font-sans selection:bg-gold-500 selection:text-black">
      {!isLaunched && <Intro onComplete={handleLaunch} />}
      
      <div className={`transition-opacity duration-1000 ${isLaunched ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <ViewVisualizer />
          <Science />
          <Market />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
