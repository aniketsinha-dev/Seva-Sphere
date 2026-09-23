import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  IndianRupee,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const RequestService: React.FC = () => {
  const { lastParsedRequest, lastAllocationResult } = useApp();
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Short realistic AI processing simulation (600ms)
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (!lastParsedRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">No active request found.</p>
        <button
          onClick={() => navigate('/customer')}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-bold"
        >
          Return to Customer Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-28">
      {/* Step Banner */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Step 1 of 3: AI Request Understanding
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Analyzing Your Service Request
          </h1>
        </div>

        <button
          onClick={() => navigate('/customer')}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg bg-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Edit Query</span>
        </button>
      </div>

      {/* Raw Query Card */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 mb-6 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-sm shrink-0">
          <Sparkles className="w-4 h-4 text-brand-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Customer Input</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5 italic">
            "{lastParsedRequest.rawQuery}"
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
            <span>Detected Language: <strong className="text-slate-700">{lastParsedRequest.detectedLanguage}</strong></span>
            <span>•</span>
            <span>Confidence: <strong className="text-emerald-700">{(lastParsedRequest.confidence * 100).toFixed(0)}%</strong></span>
          </div>
        </div>
      </div>

      {/* Processing Animation */}
      {isProcessing ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
            <Cpu className="w-7 h-7 animate-spin text-brand-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Processing Natural Language Intent...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Matching trade taxonomy, diagnostic scope, urgency &amp; cooperative service radius.
          </p>
        </div>
      ) : (
        /* Structured Output Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Structured AI Understanding</h2>
                <p className="text-xs text-slate-400">Validated taxonomy from cooperative dictionary</p>
              </div>
            </div>

            <span className="text-[11px] bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-200 font-semibold">
              Ready for Fair Matching
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Service Category</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-extrabold text-slate-900">{lastParsedRequest.service}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Verified Skill
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Matched registered cooperative trade guild</p>
            </div>

            {/* Task */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Identified Task</span>
              <p className="text-base font-bold text-slate-900 mt-1">{lastParsedRequest.task}</p>
              <p className="text-xs text-slate-500 mt-1">Standard repair scope</p>
            </div>

            {/* Location */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Location (Simulated)</span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-semibold">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{lastParsedRequest.location}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Within default 10 km service radius</p>
            </div>

            {/* Urgency */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Urgency Level</span>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-sm font-bold px-2.5 py-0.5 rounded-md ${
                    lastParsedRequest.urgency === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {lastParsedRequest.urgency}
                </span>
                <span className="text-xs text-slate-500">
                  {lastParsedRequest.urgency === 'High' ? 'Priority dispatch flag' : 'Standard scheduling'}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Guidance */}
          <div className="bg-teal-50/60 rounded-2xl p-4 border border-teal-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                ₹
              </div>
              <div>
                <span className="text-xs text-teal-800 font-bold block">Estimated Cooperative Tariff</span>
                <span className="text-sm font-extrabold text-teal-950">
                  ₹{lastParsedRequest.estimatedCost.min} – ₹{lastParsedRequest.estimatedCost.max}
                </span>
              </div>
            </div>
            <span className="text-xs text-teal-700 text-right">
              Standardized rate card • No predatory surge
            </span>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-400 text-center">
            * Demonstration mode: AI parsing performed via high-speed deterministic rules. Planned integration: Bhashini &amp; on-device language models.
          </p>

          {/* Proceed CTA */}
          <div className="pt-2">
            <button
              onClick={() => navigate('/customer/matching')}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-101"
            >
              <span>View Eligible Workers &amp; Fair Allocation Engine</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
