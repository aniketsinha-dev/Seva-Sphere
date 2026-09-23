import { ParsedRequest, ServiceCategory } from '../types';

interface ServicePattern {
  category: ServiceCategory;
  keywords: string[];
  tasks: {
    taskName: string;
    keywords: string[];
    costRange: [number, number];
  }[];
  defaultTask: string;
  defaultCost: [number, number];
}

const SERVICE_PATTERNS: ServicePattern[] = [
  {
    category: 'Electrician',
    keywords: [
      'electrician', 'electric', 'bijli', 'wire', 'wiring', 'fan', 'ceiling fan',
      'switch', 'switchboard', 'mcb', 'fuse', 'light', 'short circuit',
      'पंखा', 'बिजली', 'इलेक्ट्रीशियन', 'तार'
    ],
    tasks: [
      {
        taskName: 'Ceiling Fan Repair & Regulator Fix',
        keywords: ['fan', 'ceiling fan', 'regulator', 'पंखा', 'slow fan', 'noise'],
        costRange: [350, 500]
      },
      {
        taskName: 'Switchboard & Socket Repair',
        keywords: ['switch', 'switchboard', 'socket', 'plug', 'spark'],
        costRange: [250, 400]
      },
      {
        taskName: 'MCB Tripping / Short Circuit Diagnostic',
        keywords: ['mcb', 'short circuit', 'fuse', 'power cut', 'tripping', 'trip'],
        costRange: [400, 650]
      },
      {
        taskName: 'Full Room Wiring Check',
        keywords: ['wiring', 'wire', 'new line', 'fitting', 'tar'],
        costRange: [500, 900]
      }
    ],
    defaultTask: 'General Electrical Inspection & Repair',
    defaultCost: [350, 550]
  },
  {
    category: 'Plumber',
    keywords: [
      'plumber', 'plumbing', 'pipe', 'leak', 'leakage', 'tap', 'nal', 'nal saji',
      'drainage', 'clog', 'sink', 'water', 'basin', 'flush', 'tank',
      'प्लंबर', 'नल', 'पाइप', 'लीक'
    ],
    tasks: [
      {
        taskName: 'Pipe Leakage & Joint Repair',
        keywords: ['leak', 'leakage', 'pipe', 'burst', 'dripping', 'टपक'],
        costRange: [350, 550]
      },
      {
        taskName: 'Tap Replacement & Fitting',
        keywords: ['tap', 'nal', 'faucet', 'valve', 'fitting'],
        costRange: [250, 400]
      },
      {
        taskName: 'Drainage Clog & Blockage Clearance',
        keywords: ['clog', 'drain', 'block', 'jam', 'sink', 'toilet'],
        costRange: [400, 600]
      }
    ],
    defaultTask: 'General Plumbing Inspection & Repair',
    defaultCost: [300, 500]
  },
  {
    category: 'Carpenter',
    keywords: [
      'carpenter', 'carpentry', 'wood', 'furniture', 'door', 'lock', 'latch',
      'cupboard', 'hinge', 'shelf', 'badhai', 'बढ़ई', 'दरवाजा', 'ताला'
    ],
    tasks: [
      {
        taskName: 'Door Lock & Latch Repair',
        keywords: ['lock', 'latch', 'handle', 'hinge', 'door', 'kundi'],
        costRange: [300, 500]
      },
      {
        taskName: 'Furniture Repair & Wooden Bed Fix',
        keywords: ['furniture', 'bed', 'chair', 'table', 'sofa wood'],
        costRange: [450, 800]
      }
    ],
    defaultTask: 'General Carpentry & Wooden Fitting',
    defaultCost: [400, 650]
  },
  {
    category: 'Cleaner',
    keywords: [
      'cleaner', 'cleaning', 'clean', 'safai', 'deep cleaning', 'sanitization',
      'wash', 'sweeping', 'mopping', 'सफाई', 'धुलाई'
    ],
    tasks: [
      {
        taskName: 'Deep Bathroom & Kitchen Sanitization',
        keywords: ['bathroom', 'kitchen', 'tile', 'deep clean', 'degrease'],
        costRange: [500, 850]
      },
      {
        taskName: 'Full House Move-in Cleaning',
        keywords: ['full house', 'entire home', 'move-in', 'deep'],
        costRange: [1200, 2200]
      }
    ],
    defaultTask: 'Standard Home Cleaning Service',
    defaultCost: [450, 750]
  },
  {
    category: 'Painter',
    keywords: [
      'painter', 'paint', 'painting', 'putai', 'wall paint', 'color', 'rang',
      'waterproofing', 'पेंटर', 'रंगाई', 'पुताई'
    ],
    tasks: [
      {
        taskName: 'Single Room Accent Wall Painting',
        keywords: ['room', 'wall', 'paint', 'color', 'touchup'],
        costRange: [600, 1200]
      },
      {
        taskName: 'Moisture Dampness & Waterproofing Patch',
        keywords: ['moisture', 'seelan', 'waterproof', 'patch', 'crack'],
        costRange: [500, 950]
      }
    ],
    defaultTask: 'General Painting & Touchup Service',
    defaultCost: [500, 1000]
  },
  {
    category: 'Technician',
    keywords: [
      'technician', 'ac', 'air conditioner', 'fridge', 'refrigerator',
      'washing machine', 'appliance', 'microwave', 'motor', 'कूलर', 'एसी'
    ],
    tasks: [
      {
        taskName: 'AC Filter Cleaning & Gas Diagnostics',
        keywords: ['ac', 'air conditioner', 'cooling', 'gas', 'filter'],
        costRange: [500, 900]
      },
      {
        taskName: 'Washing Machine Spin / Drain Issue',
        keywords: ['washing machine', 'spin', 'drum', 'motor'],
        costRange: [450, 800]
      }
    ],
    defaultTask: 'General Home Appliance Servicing',
    defaultCost: [450, 750]
  }
];

const URGENCY_KEYWORDS = [
  'urgent', 'urgently', 'emergency', 'asap', 'turant', 'jaldi', 'immediately',
  'right now', 'quick', 'जल्दी', 'तुरंत', 'इमरजेंसी'
];

const HINDI_MARKERS = [
  'mujhe', 'chahiye', 'karwana', 'hai', 'karna', 'mera', 'meri', 'turant',
  'jaldi', 'kharab', 'ho gaya', 'karo', 'chahiye', 'पंखा', 'बिजली', 'नल'
];

/**
 * Intelligent Rule-Based Service Request Parser
 * Parses natural language input in English, Hindi, and Hinglish.
 */
export function parseServiceRequest(query: string): ParsedRequest {
  const normalized = query.toLowerCase().trim();

  // Detect Language
  const isHindi = HINDI_MARKERS.some(marker => normalized.includes(marker));
  const detectedLanguage = isHindi ? 'Hindi' : 'English';

  // Detect Urgency
  const isUrgent = URGENCY_KEYWORDS.some(k => normalized.includes(k));
  const urgency = isUrgent ? 'High' : 'Normal';

  // Match Service Category
  let matchedCategory: ServiceCategory = 'Electrician'; // Default fallback
  let matchedPattern = SERVICE_PATTERNS[0];
  let highestScore = 0;

  for (const pattern of SERVICE_PATTERNS) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length > 4 ? 3 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedCategory = pattern.category;
      matchedPattern = pattern;
    }
  }

  // Detect Specific Task
  let matchedTask = matchedPattern.defaultTask;
  let costRange = matchedPattern.defaultCost;

  for (const task of matchedPattern.tasks) {
    if (task.keywords.some(kw => normalized.includes(kw))) {
      matchedTask = task.taskName;
      costRange = task.costRange;
      break;
    }
  }

  // Detect Location (default to Bilaspur Central, or extract if mentioned)
  let location = 'Bilaspur Central';
  if (normalized.includes('vyapar vihar')) location = 'Vyapar Vihar, Bilaspur';
  else if (normalized.includes('torwa')) location = 'Torwa, Bilaspur';
  else if (normalized.includes('rajendra nagar')) location = 'Rajendra Nagar, Bilaspur';
  else if (normalized.includes('koni')) location = 'Koni, Bilaspur';
  else if (normalized.includes('nehru nagar')) location = 'Nehru Nagar, Bilaspur';
  else if (normalized.includes('civil lines')) location = 'Civil Lines, Bilaspur';

  return {
    service: matchedCategory,
    task: matchedTask,
    location,
    urgency,
    estimatedCost: {
      min: costRange[0],
      max: costRange[1]
    },
    detectedLanguage,
    confidence: highestScore > 0 ? 0.94 : 0.72,
    rawQuery: query
  };
}
