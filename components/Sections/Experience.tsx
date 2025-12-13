import React, { useState } from 'react';
import { SectionId } from '../../types';
import { AMENITIES } from '../../constants';
import { ChevronLeft, ChevronRight, Eye, Wind, Sparkles, Home, Utensils } from 'lucide-react';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const icons: Record<string, React.ReactNode> = {
    'Eye': <Eye className="w-5 h-5" />,
    'Wind': <Wind className="w-5 h-5" />,
    'Sparkles': <Sparkles className="w-5 h-5" />,
    'Home': <Home className="w-5 h-5" />,
    'Utensils': <Utensils className="w-5 h-5" />,
  };

  const nextSlide = () => setActiveTab((prev) => (prev + 1) % AMENITIES.length);
  const prevSlide = () => setActiveTab((prev) => (prev - 1 + AMENITIES.length) % AMENITIES.length);

  return (
    <section id={SectionId.EXPERIENCE} className="py-24 bg-space-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Guest Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From microgravity therapies to fine dining with a view of the Pacific, every moment at Belystria is curated for wonder.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Tabs (Vertical on Desktop) */}
          <div className="lg:col-span-4 flex flex-col space-y-2">
            {AMENITIES.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center px-6 py-5 text-left transition-all duration-300 border-l-2 ${
                  activeTab === index 
                  ? 'bg-white/10 border-gold-400 text-white shadow-lg' 
                  : 'bg-transparent border-white/10 text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <span className={`mr-4 ${activeTab === index ? 'text-gold-400' : 'text-gray-600'}`}>
                  {icons[item.icon]}
                </span>
                <div>
                  <h4 className="font-medium text-lg">{item.title}</h4>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 relative group">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={AMENITIES[activeTab].image} 
                alt={AMENITIES[activeTab].title} 
                className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
                <div className="flex items-center space-x-2 text-gold-400 mb-2">
                  {icons[AMENITIES[activeTab].icon]}
                  <span className="uppercase tracking-wider text-xs font-bold">Featured Amenity</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">{AMENITIES[activeTab].title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{AMENITIES[activeTab].description}</p>
              </div>

              {/* Mobile/Tablet Controls inside image */}
              <div className="absolute bottom-8 right-8 flex space-x-4 lg:hidden">
                <button onClick={prevSlide} className="p-2 bg-black/50 text-white rounded-full hover:bg-gold-500 hover:text-black transition">
                  <ChevronLeft />
                </button>
                <button onClick={nextSlide} className="p-2 bg-black/50 text-white rounded-full hover:bg-gold-500 hover:text-black transition">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;