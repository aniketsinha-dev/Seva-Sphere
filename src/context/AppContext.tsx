import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Worker,
  WorkerWithScores,
  Booking,
  ParsedRequest,
  AllocationResult
} from '../types';
import { INITIAL_WORKERS } from '../data/workers';
import { calculateFairJobAllocation } from '../utils/allocation';
import { parseServiceRequest } from '../utils/requestParser';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  workers: Worker[];
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;
  activeBooking: Booking | null;
  bookingHistory: Booking[];
  lastParsedRequest: ParsedRequest | null;
  lastAllocationResult: AllocationResult | null;
  
  // Workflow methods
  setParsedRequest: (req: ParsedRequest | null) => void;
  setAllocationResult: (res: AllocationResult | null) => void;
  createBooking: (parsed: ParsedRequest, worker: WorkerWithScores) => Booking;
  acceptBooking: (bookingId: string) => void;
  declineBooking: (bookingId: string) => void;
  startService: (bookingId: string) => void;
  completeService: (bookingId: string) => void;
  simulatePayment: (bookingId: string) => void;
  submitReview: (bookingId: string, rating: number, review: string) => void;
  
  // Cooperative actions
  toggleWorkerAvailability: (workerId: string) => void;
  toggleWorkerVerification: (workerId: string) => void;
  
  // Demo Controls
  resetDemo: () => void;
  launchPresetElectricianDemo: () => ParsedRequest;
  launchPresetPlumberDemo: () => ParsedRequest;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_WORKERS = 'seva_sphere_workers_v1';
const LOCAL_STORAGE_KEY_BOOKING = 'seva_sphere_active_booking_v1';
const LOCAL_STORAGE_KEY_HISTORY = 'seva_sphere_booking_history_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [activeWorkerId, setActiveWorkerId] = useState<string>('w-raj-kumar');

  // Load workers with fallback to initial data
  const [workers, setWorkers] = useState<Worker[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WORKERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading workers from localStorage', e);
    }
    return INITIAL_WORKERS;
  });

  // Active booking
  const [activeBooking, setActiveBooking] = useState<Booking | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKING);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading active booking from localStorage', e);
    }
    return null;
  });

  // Booking history
  const [bookingHistory, setBookingHistory] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading booking history', e);
    }
    return [];
  });

  const [lastParsedRequest, setParsedRequest] = useState<ParsedRequest | null>(null);
  const [lastAllocationResult, setAllocationResult] = useState<AllocationResult | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WORKERS, JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    if (activeBooking) {
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKING, JSON.stringify(activeBooking));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_BOOKING);
    }
  }, [activeBooking]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(bookingHistory));
  }, [bookingHistory]);

  const createBooking = (parsed: ParsedRequest, worker: WorkerWithScores): Booking => {
    const totalAmount = Math.round((parsed.estimatedCost.min + parsed.estimatedCost.max) / 2);
    const cooperativeFee = Math.round(totalAmount * 0.10); // 10% platform / cooperative welfare fund
    const workerPayout = totalAmount - cooperativeFee;

    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      customerName: 'Aniket (Demo Customer)',
      customerLocation: parsed.location,
      consumerId: 'cons-001',
      consumerName: 'Aniket (Demo Customer)',
      location: parsed.location,
      workerId: worker.id,
      workerName: worker.name,
      amount: totalAmount,
      service: parsed.service,
      task: parsed.task,
      urgency: parsed.urgency,
      assignedWorker: worker,
      status: 'requested',
      estimatedAmount: totalAmount,
      cooperativeFee,
      workerPayout,
      paymentStatus: 'unpaid',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setActiveBooking(newBooking);
    setActiveWorkerId(worker.id); // Automatically focus Worker Portal on the assigned worker
    return newBooking;
  };

  const acceptBooking = (bookingId: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      return {
        ...prev,
        status: 'accepted',
        acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  };

  const declineBooking = (bookingId: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      const currentWorkerId = prev.assignedWorker?.id;
      // Re-run Fair Job Allocation excluding the declining worker
      const candidatePool = workers.filter(w => w.id !== currentWorkerId);
      const realloc = calculateFairJobAllocation(candidatePool, prev.service);
      if (realloc.selectedWorker) {
        setActiveWorkerId(realloc.selectedWorker.id);
        return {
          ...prev,
          assignedWorker: realloc.selectedWorker,
          status: 'requested'
        };
      }
      return {
        ...prev,
        assignedWorker: null,
        status: 'declined'
      };
    });
  };

  const startService = (bookingId: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      return {
        ...prev,
        status: 'in_progress',
        startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  };

  const completeService = (bookingId: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      const completed: Booking = {
        ...prev,
        status: 'completed',
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Also update worker's recentJobs and todayEarnings dynamically
      if (prev.assignedWorker) {
        const assignedId = prev.assignedWorker.id;
        setWorkers(curr =>
          curr.map(w => {
            if (w.id === assignedId) {
              return {
                ...w,
                recentJobs: w.recentJobs + 1,
                todayEarnings: w.todayEarnings + prev.workerPayout
              };
            }
            return w;
          })
        );
      }

      return completed;
    });
  };

  const simulatePayment = (bookingId: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      return {
        ...prev,
        status: 'paid',
        paymentStatus: 'paid',
        paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  };

  const submitReview = (bookingId: string, rating: number, review: string) => {
    setActiveBooking(prev => {
      if (!prev || prev.id !== bookingId) return prev;
      const sanitizedReview = review.trim() || 'Cooperative service completed satisfactorily.';
      const validRating = Math.max(1, Math.min(5, rating || 5));
      const closed: Booking = {
        ...prev,
        status: 'closed',
        rating: validRating,
        review: sanitizedReview,
        closedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Push to history
      setBookingHistory(h => [closed, ...h]);
      return closed;
    });
  };

  const toggleWorkerAvailability = (workerId: string) => {
    setWorkers(curr =>
      curr.map(w => (w.id === workerId ? { ...w, available: !w.available } : w))
    );
  };

  const toggleWorkerVerification = (workerId: string) => {
    setWorkers(curr =>
      curr.map(w => (w.id === workerId ? { ...w, verified: !w.verified } : w))
    );
  };

  const resetDemo = () => {
    setWorkers(INITIAL_WORKERS);
    setActiveBooking(null);
    setActiveWorkerId('w-raj-kumar');
    setParsedRequest(null);
    setAllocationResult(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY_WORKERS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_BOOKING);
  };

  const launchPresetElectricianDemo = (): ParsedRequest => {
    const query = "I need an electrician to repair my ceiling fan.";
    const parsed = parseServiceRequest(query);
    const alloc = calculateFairJobAllocation(workers, parsed.service);
    setParsedRequest(parsed);
    setAllocationResult(alloc);
    return parsed;
  };

  const launchPresetPlumberDemo = (): ParsedRequest => {
    const query = "Urgent pipe leakage in kitchen bathroom.";
    const parsed = parseServiceRequest(query);
    const alloc = calculateFairJobAllocation(workers, parsed.service);
    setParsedRequest(parsed);
    setAllocationResult(alloc);
    return parsed;
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        workers,
        activeWorkerId,
        setActiveWorkerId,
        activeBooking,
        bookingHistory,
        lastParsedRequest,
        lastAllocationResult,
        setParsedRequest,
        setAllocationResult,
        createBooking,
        acceptBooking,
        declineBooking,
        startService,
        completeService,
        simulatePayment,
        submitReview,
        toggleWorkerAvailability,
        toggleWorkerVerification,
        resetDemo,
        launchPresetElectricianDemo,
        launchPresetPlumberDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
