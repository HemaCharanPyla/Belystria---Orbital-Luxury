import { Amenity, SpecItem } from './types';

export const AMENITIES: Amenity[] = [
  {
    id: 'astra-dome',
    title: 'Astra Dome Observatory',
    description: 'A 360-degree viewing deck offering unadulterated views of the cosmos and the blue marble below. Inspired by the ISS Cupola.',
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000&auto=format&fit=crop',
    icon: 'Eye'
  },
  {
    id: 'zero-g-ballroom',
    title: 'Zero-G Grand Ballroom',
    description: 'Experience true weightlessness in our central hub, designed for floating dances and aerial acrobatics in a microgravity environment.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop',
    icon: 'Wind'
  },
  {
    id: 'zenith-spa',
    title: 'Zenith Spa',
    description: 'Microgravity therapies designed to rejuvenate your body. Utilizing NASA-derived fluid dynamics for weightless hydrotherapy.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
    icon: 'Sparkles'
  },
  {
    id: 'earthlight-suites',
    title: 'Earthlight Suites',
    description: 'Luxury habitation modules with floor-to-ceiling smart glass constantly facing Earth. Based on TransHab expandable module technology.',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000&auto=format&fit=crop',
    icon: 'Home'
  },
  {
    id: 'nebula-dining',
    title: 'Nebula Fine Dining',
    description: 'Gourmet cuisine cultivated in our orbital aeroponic gardens, prepared by world-class chefs using NASA food science innovations.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
    icon: 'Utensils'
  }
];

export const TECHNICAL_SPECS: SpecItem[] = [
  { label: 'Orbit Altitude', value: '400 km', detail: 'Low Earth Orbit (LEO)' },
  { label: 'Orbital Period', value: '92 mins', detail: '16 Sunrises per day' },
  { label: 'Velocity', value: '7.67 km/s', detail: '27,600 km/h' },
  { label: 'Diameter', value: '180 m', detail: 'Rotating Torus' },
  { label: 'Gravity (Rim)', value: '0.38 G', detail: 'Martian Gravity Equivalent' },
  { label: 'Capacity', value: '400', detail: '280 Guests, 120 Crew' },
];

export const MARKET_DATA = [
  { year: '2024', value: 0.8 },
  { year: '2026', value: 2.1 },
  { year: '2028', value: 5.4 },
  { year: '2030', value: 12.8 },
  { year: '2032', value: 24.5 },
  { year: '2034', value: 47.0 },
];
