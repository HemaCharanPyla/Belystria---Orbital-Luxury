import React from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Experience from './components/Sections/Experience';
import Technology from './components/Sections/Technology';
import Science from './components/Sections/Science';
import Market from './components/Sections/Market';
import Contact from './components/Sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-space-950 text-white font-sans selection:bg-gold-500 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Technology />
        <Science />
        <Market />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;