export type ServiceCategory =
  | 'Electrician'
  | 'Plumber'
  | 'Carpenter'
  | 'Painter'
  | 'Cleaner'
  | 'Technician'
  | 'Gardener'
  | 'Driver';

export interface Worker {
  id: string;
  name: string;
  phone: string;
  skill: ServiceCategory;
  rating: number;          // e.g. 4.5
  recentJobs: number;      // e.g. 2
  distance: number;        // distance in km from customer (e.g. 2.1)
  verified: boolean;
  available: boolean;
  experienceYears: number;
  location: string;        // e.g. "Bilaspur Central"
  todayEarnings: number;   // e.g. 1250
  cooperativeName: string; // e.g. "Bilaspur Labour Cooperative Federation"
  avatarUrl?: string;
  badge?: string;
}

export interface WorkerWithScores extends Worker {
  fairnessScore: number;       // 1 / (1 + recentJobs)
  distanceScore: number;       // 1 - (distance / maxRadius)
  ratingScore: number;         // rating / 5.0
  finalScore: number;          // 0.40 * fairness + 0.30 * distance + 0.30 * rating
  allocationPercentage: number;// finalScore * 100
  scoreExplanation: string;
  isUnderutilized: boolean;
  isNewWorker?: boolean;
}

export interface AllocationConfig {
  maxRadiusKm: number;         // default: 10
  fairnessWeight: number;      // default: 0.40
  distanceWeight: number;      // default: 0.30
  ratingWeight: number;        // default: 0.30
}

export interface AllocationResult {
  eligibleWorkers: WorkerWithScores[];
  ineligibleWorkers: { worker: Worker; reason: string }[];
  selectedWorker: WorkerWithScores | null;
  tieBreakerApplied: boolean;
  tieBreakerReason?: string;
  timestamp: string;
  config: AllocationConfig;
}

export interface ParsedRequest {
  service: ServiceCategory;
  task: string;
  location: string;
  urgency: 'Normal' | 'High';
  estimatedCost: {
    min: number;
    max: number;
  };
  detectedLanguage: 'English' | 'Hindi' | 'Hinglish';
  confidence: number;
  rawQuery: string;
}

export type BookingStatus =
  | 'requested'
  | 'assigned'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'payment_pending'
  | 'paid'
  | 'closed'
  | 'reviewed'
  | 'declined';

export interface Booking {
  id: string;
  customerName: string;
  customerLocation: string;
  // Aliases matching prompt spec
  consumerId?: string;
  consumerName?: string;
  location?: string;
  workerId?: string;
  workerName?: string;
  amount?: number;
  service: ServiceCategory;
  task: string;
  urgency: 'Normal' | 'High';
  assignedWorker: WorkerWithScores | null;
  status: BookingStatus;
  estimatedAmount: number;
  cooperativeFee: number;
  workerPayout: number;
  paymentStatus: 'unpaid' | 'paid';
  rating?: number;
  review?: string;
  createdAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  paidAt?: string;
  closedAt?: string;
}

export type UserRole = 'customer' | 'worker' | 'cooperative';
