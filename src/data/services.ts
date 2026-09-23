import { ServiceCategory } from '../types';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  hindiTitle: string;
  description: string;
  iconName: string;
  basePrice: number;
  popularTasks: string[];
  gradient: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 's-electrician',
    category: 'Electrician',
    title: 'Electrician Services',
    hindiTitle: 'बिजली मिस्त्री सेवा',
    description: 'Ceiling fans, wiring, switchboards, MCBs & home electrical fixtures.',
    iconName: 'Zap',
    basePrice: 350,
    popularTasks: ['Ceiling Fan Repair', 'Switchboard Repair', 'House Wiring Check', 'Short Circuit Fix'],
    gradient: 'from-amber-500 to-yellow-600'
  },
  {
    id: 's-plumber',
    category: 'Plumber',
    title: 'Plumbing Services',
    hindiTitle: 'नलसाजी (प्लंबर) सेवा',
    description: 'Pipe leaks, tap replacement, drainage blockages & bathroom fixtures.',
    iconName: 'Wrench',
    basePrice: 300,
    popularTasks: ['Pipe Leakage Fix', 'Tap Replacement', 'Drainage Blockage', 'Water Tank Cleaning'],
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 's-carpenter',
    category: 'Carpenter',
    title: 'Carpentry & Woodwork',
    hindiTitle: 'बढ़ई सेवा',
    description: 'Door locks, furniture repair, wooden shelves, cupboards & hinges.',
    iconName: 'Hammer',
    basePrice: 400,
    popularTasks: ['Door Lock / Latch Fix', 'Bed / Chair Repair', 'Cabinet Hinge Fixing', 'Custom Shelf Fitting'],
    gradient: 'from-orange-600 to-amber-700'
  },
  {
    id: 's-painter',
    category: 'Painter',
    title: 'Painting & Touchup',
    hindiTitle: 'पेंटर एवं पुताई सेवा',
    description: 'Interior wall painting, touch-up patch work, moisture waterproofing.',
    iconName: 'Paintbrush',
    basePrice: 500,
    popularTasks: ['Single Room Wall Paint', 'Moisture Waterproofing', 'Door / Window Enamel', 'Wall Touch-up Patch'],
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 's-cleaner',
    category: 'Cleaner',
    title: 'Deep Cleaning',
    hindiTitle: 'सफाई एवं स्वच्छता सेवा',
    description: 'Full house deep cleaning, kitchen degreasing, bathroom sanitization.',
    iconName: 'Sparkles',
    basePrice: 450,
    popularTasks: ['Deep Bathroom Sanitization', 'Kitchen Degreasing', 'Sofa Deep Shampooing', 'Full House Move-in Clean'],
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 's-technician',
    category: 'Technician',
    title: 'Appliance Repair',
    hindiTitle: 'उपकरण मरम्मत सेवा',
    description: 'AC servicing, refrigerator cooling fixes, washing machine motors.',
    iconName: 'Cpu',
    basePrice: 450,
    popularTasks: ['AC Filter & Gas Check', 'Washing Machine Drum Fix', 'Refrigerator Thermostat', 'Microwave Repair'],
    gradient: 'from-teal-600 to-cyan-700'
  }
];
