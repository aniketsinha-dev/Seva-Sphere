import React from 'react';
import { WorkerWithScores } from '../../types';
import {
  Star,
  MapPin,
  Briefcase,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';

interface AllocationCardProps {
  worker: WorkerWithScores;
  isSelected: boolean;
  rank: number;
  onSelect?: () => void;
}

export const AllocationCard: React.FC<AllocationCardProps> = ({
  worker,
  isSelected,
  rank,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-5 transition-all cursor-pointer ${
        isSelected
          ? 'bg-white border-2 border-brand-500 shadow-xl shadow-brand-500/10 ring-4 ring-brand-50'
          : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow'
      }`}
    >
      {/* Rank and Selected Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isSelected
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            #{rank}
          </span>
          {isSelected && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-600 text-white shadow-sm">
              <Award className="w-3.5 h-3.5" /> Fairly Allocated Candidate
            </span>
          )}
        </div>

        {/* Dynamic Allocation Score */}
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Fair Allocation Score
          </span>
          <span
            className={`text-xl font-extrabold ${
              isSelected ? 'text-brand-600' : 'text-slate-700'
            }`}
          >
            {worker.allocationPercentage}%
          </span>
        </div>
      </div>

      {/* Worker Identity */}
      <div className="flex items-start gap-3.5">
        <div className="relative">
          <img
            src={worker.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
            alt={worker.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
          />
          {worker.verified && (
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
              <ShieldCheck className="w-3 h-3" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base truncate">{worker.name}</h3>
          </div>
          <p className="text-xs text-brand-700 font-semibold">{worker.skill}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <strong className="text-slate-800">{worker.rating.toFixed(1)}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{worker.distance.toFixed(1)} km</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Recent jobs: <strong className="text-slate-800">{worker.recentJobs}</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Underutilized / Fairness Callout */}
      {worker.isUnderutilized && (
        <div className="mt-3 bg-brand-50 border border-brand-200/80 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs text-brand-900">
          <TrendingUp className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="font-medium text-[11px]">
            Underutilized worker received high fairness weighting (recent jobs: {worker.recentJobs}).
          </span>
        </div>
      )}

      {/* Component Scores Breakdown */}
      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <span className="text-[10px] text-slate-500 block font-medium">Fairness (40%)</span>
          <span className="font-bold text-teal-700 text-sm">
            {(worker.fairnessScore * 100).toFixed(0)}%
          </span>
          <span className="text-[9px] text-slate-400 block font-mono">1/(1+{worker.recentJobs})</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <span className="text-[10px] text-slate-500 block font-medium">Distance (30%)</span>
          <span className="font-bold text-blue-700 text-sm">
            {(worker.distanceScore * 100).toFixed(0)}%
          </span>
          <span className="text-[9px] text-slate-400 block font-mono">{worker.distance}km</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <span className="text-[10px] text-slate-500 block font-medium">Rating (30%)</span>
          <span className="font-bold text-amber-700 text-sm">
            {(worker.ratingScore * 100).toFixed(0)}%
          </span>
          <span className="text-[9px] text-slate-400 block font-mono">{worker.rating}/5</span>
        </div>
      </div>

      {/* Rationale explanation */}
      <p className="mt-2.5 text-[11px] text-slate-500 italic">
        "{worker.scoreExplanation}"
      </p>
    </div>
  );
};
