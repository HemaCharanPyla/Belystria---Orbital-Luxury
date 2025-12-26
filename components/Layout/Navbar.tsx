
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { SectionId } from '../../types.ts';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: SectionId.ABOUT },
    { name: 'Experience', id: SectionId.EXPERIENCE },
    { name: 'Visualizer', id: SectionId.VISUALIZER },
    { name: 'Contact', id: SectionId.CONTACT },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-space-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection(SectionId.HOME)}>
            <Rocket className="h-8 w-8 text-gold-400 mr-2" />
            <span className="font-serif text-2xl font-bold tracking-widest text-white">BELYSTRIA</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="bg-white/10 hover:bg-gold-500 hover:text-black text-white px-6 py-2 rounded-full transition-all duration-300 border border-white/20 hover:border-transparent font-medium"
            >
              Reserve
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold-400">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-space-950 border-t border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
