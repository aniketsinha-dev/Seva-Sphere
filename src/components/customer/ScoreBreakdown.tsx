import React from 'react';
import {
  Scale,
  Compass,
  Star,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AllocationConfig } from '../../types';

interface ScoreBreakdownProps {
  config: AllocationConfig;
  totalEvaluated: number;
  eligibleCount: number;
  filteredCount: number;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  config,
  totalEvaluated,
  eligibleCount,
  filteredCount
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white rounded-2xl p-6 border border-slate-700/80 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <Scale className="w-3.5 h-3.5 text-brand-400" />
            <span>Core Differentiator: Ethical Algorithmic Distribution</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Fair Job Allocation Engine
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Unlike gig platforms that monopolize orders to top 5% gig workers or purely nearest proximity,
            Seva Sphere calculates a balanced multi-factor equity score to sustain all cooperative members.
          </p>
        </div>

        {/* Evaluation Stats */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs">
          <div className="text-center px-2">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Scanned</span>
            <span className="text-base font-bold text-white">{totalEvaluated}</span>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center px-2">
            <span className="text-emerald-400 block text-[10px] uppercase font-semibold">Eligible</span>
            <span className="text-base font-bold text-emerald-400">{eligibleCount}</span>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center px-2">
            <span className="text-amber-400 block text-[10px] uppercase font-semibold">Filtered</span>
            <span className="text-base font-bold text-amber-400">{filteredCount}</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="my-5 py-3 px-4 bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-x-auto">
        <div className="flex items-center min-w-[620px] justify-between text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2 text-brand-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-400 flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Customer Request</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex items-center gap-2 text-brand-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-400 flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Service Detection</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex items-center gap-2 text-brand-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-400 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Eligibility Filter</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400 flex items-center justify-center text-[10px] font-bold">4</span>
            <span>Fairness Calculation</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400 flex items-center justify-center text-[10px] font-bold">5</span>
            <span>Worker Ranking</span>
          </div>
        </div>
      </div>

      {/* Mathematical Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
        {/* Fairness Component */}
        <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Workload Fairness</h4>
                <p className="text-[10px] text-teal-300 font-mono">Weight: {(config.fairnessWeight * 100).toFixed(0)}%</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
              Primary Factor
            </span>
          </div>
          <div className="mt-3 bg-slate-900/60 p-2 rounded-lg font-mono text-[11px] text-teal-200 border border-slate-800">
            Formula: 1 / (1 + recentJobs)
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-normal">
            Prioritizes verified workers with fewer recent orders, preventing job monopolization while boosting underutilized workers naturally.
          </p>
        </div>

        {/* Distance Component */}
        <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Proximity Distance</h4>
                <p className="text-[10px] text-blue-300 font-mono">Weight: {(config.distanceWeight * 100).toFixed(0)}%</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Radius: {config.maxRadiusKm} km
            </span>
          </div>
          <div className="mt-3 bg-slate-900/60 p-2 rounded-lg font-mono text-[11px] text-blue-200 border border-slate-800">
            Formula: 1 - (distance / maxRadius)
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-normal">
            Ensures workers are reasonably close to minimize customer wait times and worker transit costs.
          </p>
        </div>

        {/* Rating Component */}
        <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Cooperative Rating</h4>
                <p className="text-[10px] text-amber-300 font-mono">Weight: {(config.ratingWeight * 100).toFixed(0)}%</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Quality Anchor
            </span>
          </div>
          <div className="mt-3 bg-slate-900/60 p-2 rounded-lg font-mono text-[11px] text-amber-200 border border-slate-800">
            Formula: rating / 5.0
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-normal">
            Anchors service quality without locking out low-tenure workers who maintain compliant federation standards.
          </p>
        </div>
      </div>

      {/* Composite Formula Bar */}
      <div className="mt-4 pt-3 border-t border-slate-700/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-brand-400" />
          <span>
            Composite Allocation Formula: <strong className="font-mono text-brand-300">FinalScore = 0.40·Fairness + 0.30·Distance + 0.30·Rating</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Tie-breaker: Lower recent workload $\to$ closer proximity</span>
        </div>
      </div>
    </div>
  );
};
