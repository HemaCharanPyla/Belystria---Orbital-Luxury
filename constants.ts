
import { Amenity, SpecItem, TierInfo } from './types';

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
  { label: 'Rotation Speed', value: '1.94 RPM', detail: 'Optimized for 0.38g' },
  { label: 'Tangential Vel', value: '18.3 m/s', detail: '66 km/h at Rim' },
  { label: 'Angular Vel', value: '0.20 rad/s', detail: 'Constant Velocity' },
  { label: 'Orbital Velocity', value: '7.67 km/s', detail: '27,600 km/h' },
  { label: 'Diameter', value: '180 m', detail: 'Rotating Torus' },
  { label: 'Capacity', value: '400', detail: '280 Guests, 120 Crew' },
];

export const MISSION_TIERS: TierInfo[] = [
  {
    id: 'voyager',
    label: 'Voyager Class',
    price: '$2.5M',
    duration: '3 Days',
    description: 'The definitive orbital introduction. Witness 48 sunrises and experience the pure awe of the Overview Effect from our standard observation decks.',
    perks: [
      'Standard Earth-view Habitation',
      'Full Zero-G Ballroom Access',
      'Curated Orbital Astronomy Tours',
      'Commemorative Flight Patch'
    ]
  },
  {
    id: 'pioneer',
    label: 'Pioneer Class',
    price: '$5.0M',
    duration: '7 Days',
    description: 'For those who seek deeper cosmic connection. Extended duration allows for complete physiological adaptation to 0.38g and deeper wellness immersion.',
    perks: [
      'Premium Horizon-view Suite',
      'Private Microgravity Wellness Session',
      'Astra Dome Priority Access',
      'Personalized Aeroponic Dining Plan'
    ]
  },
  {
    id: 'legacy',
    label: 'Legacy Suite',
    price: '$12.0M',
    duration: '7 Days',
    description: 'The pinnacle of extraterrestrial residence. A multi-room module featuring 360-degree panoramic views and a dedicated mission support team.',
    perks: [
      'Private Multi-module Master Suite',
      'Exclusive EVA Spacewalk Experience',
      'Personal AI Concierge Steward',
      'Private Captain\'s Table Dining',
      'Commemorative Bespoke Flight Suit'
    ]
  }
];

export const MARKET_DATA = [
  { year: '2024', value: 0.8 },
  { year: '2026', value: 2.1 },
  { year: '2028', value: 5.4 },
  { year: '2030', value: 12.8 },
  { year: '2032', value: 24.5 },
  { year: '2034', value: 47.0 },
];
