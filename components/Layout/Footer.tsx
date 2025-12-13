import React from 'react';
import { Rocket, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <div className="flex items-center mb-6 md:mb-0">
          <Rocket className="h-6 w-6 text-gold-400 mr-2" />
          <span className="font-serif text-xl font-bold text-white tracking-widest">BELYSTRIA</span>
        </div>

        <div className="text-gray-500 text-sm mb-6 md:mb-0 text-center md:text-left">
          &copy; 2025 Belystria Orbital Hospitality Group. <br className="hidden md:block"/>
          Registered in Zurich, Switzerland & LEO Station Node 1.
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;