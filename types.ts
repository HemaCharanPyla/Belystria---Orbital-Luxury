export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface SpecItem {
  label: string;
  value: string;
  detail: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  TECHNOLOGY = 'technology',
  SCIENCE = 'science',
  MARKET = 'market',
  CONTACT = 'contact',
}