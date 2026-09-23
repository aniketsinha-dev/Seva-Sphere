import {
  Worker,
  WorkerWithScores,
  AllocationResult,
  AllocationConfig,
  ServiceCategory
} from '../types';

export const DEFAULT_ALLOCATION_CONFIG: AllocationConfig = {
  maxRadiusKm: 10.0,
  fairnessWeight: 0.40,
  distanceWeight: 0.30,
  ratingWeight: 0.30
};

/**
 * FAIR JOB ALLOCATION ENGINE
 * 
 * Core Differentiator:
 * Balances workload distribution across cooperative members while maintaining
 * high service quality and reasonable proximity.
 * 
 * Formulas:
 * - Fairness Score = 1 / (1 + recentJobs)
 * - Distance Score = max(0, 1 - (distance / maxRadius))
 * - Rating Score = rating / 5.0
 * - Final Score = (0.40 * fairness) + (0.30 * distance) + (0.30 * rating)
 */
export function calculateFairJobAllocation(
  workers: Worker[],
  requestedService: ServiceCategory,
  config: AllocationConfig = DEFAULT_ALLOCATION_CONFIG
): AllocationResult {
  const eligibleWorkers: WorkerWithScores[] = [];
  const ineligibleWorkers: { worker: Worker; reason: string }[] = [];

  // Step 1: Strict Eligibility Filtering
  for (const worker of workers) {
    if (worker.skill !== requestedService) {
      ineligibleWorkers.push({
        worker,
        reason: `Skill mismatch (Expected: ${requestedService}, Has: ${worker.skill})`
      });
      continue;
    }

    if (!worker.verified) {
      ineligibleWorkers.push({
        worker,
        reason: 'Cooperative verification pending or unverified'
      });
      continue;
    }

    if (!worker.available) {
      ineligibleWorkers.push({
        worker,
        reason: 'Worker currently marked offline / busy'
      });
      continue;
    }

    if (worker.distance > config.maxRadiusKm) {
      ineligibleWorkers.push({
        worker,
        reason: `Exceeds max service radius (${worker.distance.toFixed(1)} km > ${config.maxRadiusKm} km)`
      });
      continue;
    }

    // Step 2: Scoring calculations
    // Fairness score favors underutilized workers: 1 / (1 + recentJobs)
    const fairnessScore = 1 / (1 + worker.recentJobs);

    // Distance score favors closer workers, clamped between 0 and 1
    const rawDistanceScore = 1 - (worker.distance / config.maxRadiusKm);
    const distanceScore = Math.max(0, Math.min(1, rawDistanceScore));

    // Rating score normalized to [0, 1]
    const ratingScore = Math.max(0, Math.min(1, worker.rating / 5.0));

    // Weighted composite score (Prototype weights: 40% Fairness, 30% Distance, 30% Rating)
    const finalScore = (
      config.fairnessWeight * fairnessScore +
      config.distanceWeight * distanceScore +
      config.ratingWeight * ratingScore
    );

    const isUnderutilized = worker.recentJobs <= 1;

    let scoreExplanation = '';
    if (worker.recentJobs === 0) {
      scoreExplanation = 'Zero recent jobs: received peak fairness weighting (+40%) to ensure equitable work distribution.';
    } else if (worker.recentJobs <= 2) {
      scoreExplanation = 'Low recent workload: balanced high fairness with strong rating & distance.';
    } else if (worker.recentJobs >= 6) {
      scoreExplanation = 'High recent workload: lower fairness priority to prevent worker burnout and share opportunities.';
    } else {
      scoreExplanation = 'Moderate workload: balanced across distance, rating, and fairness.';
    }

    eligibleWorkers.push({
      ...worker,
      fairnessScore: Number(fairnessScore.toFixed(4)),
      distanceScore: Number(distanceScore.toFixed(4)),
      ratingScore: Number(ratingScore.toFixed(4)),
      finalScore: Number(finalScore.toFixed(4)),
      allocationPercentage: Math.round(finalScore * 100),
      scoreExplanation,
      isUnderutilized
    });
  }

  // Step 3: Ranking with Intelligent Tie-Breaker
  let tieBreakerApplied = false;
  let tieBreakerReason: string | undefined = undefined;

  eligibleWorkers.sort((a, b) => {
    const diff = b.finalScore - a.finalScore;
    // If difference is negligible (within 0.005), apply tie-breaker
    if (Math.abs(diff) < 0.005) {
      tieBreakerApplied = true;
      if (a.recentJobs !== b.recentJobs) {
        tieBreakerReason = `Score tie broken by lower recent workload (${a.name}: ${a.recentJobs} jobs vs ${b.name}: ${b.recentJobs} jobs)`;
        return a.recentJobs - b.recentJobs;
      }
      // Secondary tie-breaker: closer distance
      tieBreakerReason = `Score tie broken by proximity (${a.name}: ${a.distance}km vs ${b.name}: ${b.distance}km)`;
      return a.distance - b.distance;
    }
    return diff;
  });

  const selectedWorker = eligibleWorkers.length > 0 ? eligibleWorkers[0] : null;

  return {
    eligibleWorkers,
    ineligibleWorkers,
    selectedWorker,
    tieBreakerApplied,
    tieBreakerReason,
    timestamp: new Date().toISOString(),
    config
  };
}
