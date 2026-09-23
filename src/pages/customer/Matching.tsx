import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ScoreBreakdown } from '../../components/customer/ScoreBreakdown';
import { AllocationCard } from '../../components/customer/AllocationCard';
import { calculateFairJobAllocation } from '../../utils/allocation';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Award,
  ArrowRight,
  SlidersHorizontal,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { WorkerWithScores } from '../../types';

export const Matching: React.FC = () => {
  const {
    workers,
    lastParsedRequest,
    lastAllocationResult,
    setAllocationResult,
    createBooking
  } = useApp();
  const navigate = useNavigate();

  const [selectedCandidate, setSelectedCandidate] = useState<WorkerWithScores | null>(null);
  const [showIneligible, setShowIneligible] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Recalculate on mount or if workers/request changed
  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
    }, 700);

    const service = lastParsedRequest?.service || 'Electrician';
    const result = calculateFairJobAllocation(workers, service);
    setAllocationResult(result);
    if (result.selectedWorker) {
      setSelectedCandidate(result.selectedWorker);
    }

    return () => clearTimeout(scanTimer);
  }, [workers, lastParsedRequest]);

  const effectiveAllocation =
    lastAllocationResult ||
    (lastParsedRequest ? calculateFairJobAllocation(workers, lastParsedRequest.service) : null);

  if (!lastParsedRequest || !effectiveAllocation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">No active service search in progress.</p>
        <button
          onClick={() => navigate('/customer')}
          className="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm"
        >
          Start New Service Request
        </button>
      </div>
    );
  }

  const { eligibleWorkers, ineligibleWorkers, selectedWorker, tieBreakerApplied, tieBreakerReason, config } = effectiveAllocation;
  const currentSelected = selectedCandidate || selectedWorker;

  const handleAssignWorker = () => {
    if (!currentSelected) return;
    createBooking(lastParsedRequest, currentSelected);
    navigate('/customer/status');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {/* Top Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Step 2 of 3: Fair Algorithmic Allocation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Fair Worker Allocation: {lastParsedRequest.service}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Task: <strong className="text-slate-700">{lastParsedRequest.task}</strong> • Location:{' '}
              <strong className="text-slate-700">{lastParsedRequest.location}</strong>
            </p>
          </div>

          <button
            onClick={() => navigate('/customer')}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 border border-slate-200 px-3.5 py-2 rounded-xl bg-white shadow-sm hover:bg-slate-50 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Change Request</span>
          </button>
        </div>
      </div>

      {/* Matching Radar Scanning Status */}
      {isScanning ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand-200 animate-ping opacity-75"></div>
            <div className="relative w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Finding verified workers nearby...
          </h3>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600">✓ Service matched</span>
            <span className="flex items-center gap-1 text-emerald-600">✓ Skill verified</span>
            <span className="flex items-center gap-1 text-emerald-600">✓ Availability checked</span>
            <span className="flex items-center gap-1 text-emerald-600">✓ Location checked</span>
            <span className="flex items-center gap-1 text-brand-600 font-bold">✓ Fair allocation calculated</span>
          </div>
        </div>
      ) : (
        <>
          {/* Transparent Score Breakdown & Formula Component */}
          <div className="mb-8">
            <ScoreBreakdown
              config={config}
              totalEvaluated={workers.length}
              eligibleCount={eligibleWorkers.length}
              filteredCount={ineligibleWorkers.length}
            />
          </div>

          {/* Tie Breaker Notice (if triggered) */}
          {tieBreakerApplied && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase">Tie-Breaker Rule Applied</h4>
                <p className="text-xs text-amber-800 mt-0.5">{tieBreakerReason}</p>
              </div>
            </div>
          )}

          {/* Top Allocated Worker Highlight Hero Card */}
          {currentSelected && (
            <div className="mb-10 bg-gradient-to-br from-brand-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/30 text-brand-200 text-xs font-bold border border-brand-400/40 mb-3">
                    <Award className="w-3.5 h-3.5 text-brand-300" />
                    <span>FAIRLY ALLOCATED WORKER</span>
                  </div>

                  <div className="flex items-center gap-4 mt-1">
                    <img
                      src={currentSelected.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
                      alt={currentSelected.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-400 shadow-md"
                    />
                    <div>
                      <h2 className="text-2xl font-black text-white">{currentSelected.name}</h2>
                      <p className="text-sm font-semibold text-brand-300">
                        {currentSelected.skill} • {currentSelected.cooperativeName}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
                        <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Member
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-300 font-bold">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {currentSelected.rating.toFixed(1)} Rating
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-slate-400" /> {currentSelected.distance.toFixed(1)} km away
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score & Action Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:border-l lg:border-slate-700/80 lg:pl-6">
                  <div className="text-left sm:text-center bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                      Fair Allocation Score
                    </span>
                    <span className="text-3xl font-extrabold text-brand-300">
                      {currentSelected.allocationPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Composite Equity Index
                    </span>
                  </div>

                  <button
                    onClick={handleAssignWorker}
                    className="px-8 py-4 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Assign Worker</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Eligible Candidates Comparison Grid */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  All Eligible Candidates ({eligibleWorkers.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Workers ranked in real time according to the multi-factor mathematical formula.
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Sorted by Final Score
              </span>
            </div>

            {eligibleWorkers.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800">No Eligible Workers Found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  No verified {lastParsedRequest.service} is currently available within the 10km service radius.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {eligibleWorkers.map((w, idx) => (
                  <AllocationCard
                    key={w.id}
                    worker={w}
                    rank={idx + 1}
                    isSelected={currentSelected?.id === w.id}
                    onSelect={() => setSelectedCandidate(w)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Ineligible Workers Section */}
          {ineligibleWorkers.length > 0 && (
            <div className="bg-slate-100/80 rounded-2xl border border-slate-200 p-4">
              <button
                onClick={() => setShowIneligible(!showIneligible)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-900"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>
                    Inspect Filtered Candidates ({ineligibleWorkers.length}) - Audit Transparency
                  </span>
                </div>
                {showIneligible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showIneligible && (
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  {ineligibleWorkers.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{item.worker.name}</span>
                        <span className="text-slate-400 ml-2">({item.worker.skill})</span>
                      </div>
                      <span className="text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px] font-medium">
                        Filtered: {item.reason}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
