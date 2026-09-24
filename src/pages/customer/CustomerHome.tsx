import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SERVICES, ServiceItem } from '../../data/services';
import { parseServiceRequest } from '../../utils/requestParser';
import { calculateFairJobAllocation } from '../../utils/allocation';
import {
  Search,
  Sparkles,
  MapPin,
  ArrowRight,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkle,
  Cpu,
  Globe,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Star,
  Clock,
  Briefcase,
  CreditCard,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { ServiceCategory } from '../../types';
import { StatusTimeline } from '../../components/customer/StatusTimeline';

export const CustomerHome: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  const {
    activeBooking,
    simulatePayment,
    setRole,
    setParsedRequest,
    setAllocationResult,
    workers
  } = useApp();
  const navigate = useNavigate();

  const handleJumpToWorker = () => {
    setRole('worker');
    navigate('/worker');
  };

  const handlePayNow = () => {
    if (activeBooking) {
      simulatePayment(activeBooking.id);
    }
  };

  const assignedWorker = activeBooking?.assignedWorker || (activeBooking?.workerId ? workers.find(w => w.id === activeBooking.workerId) : null);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const searchQuery = query.trim() || 'I need an electrician to repair my ceiling fan.';
    
    // Process through local AI parser
    const parsed = parseServiceRequest(searchQuery);
    setParsedRequest(parsed);

    // Calculate Fair Allocation immediately
    const alloc = calculateFairJobAllocation(workers, parsed.service);
    setAllocationResult(alloc);

    navigate('/customer/request');
  };

  const handleQuickPrompt = (promptText: string) => {
    setQuery(promptText);
    const parsed = parseServiceRequest(promptText);
    setParsedRequest(parsed);
    const alloc = calculateFairJobAllocation(workers, parsed.service);
    setAllocationResult(alloc);
    navigate('/customer/request');
  };

  const handleCategoryClick = (category: ServiceCategory, defaultTask: string) => {
    const text = `I need a verified ${category.toLowerCase()} for ${defaultTask.toLowerCase()}.`;
    setQuery(text);
    const parsed = parseServiceRequest(text);
    setParsedRequest(parsed);
    const alloc = calculateFairJobAllocation(workers, parsed.service);
    setAllocationResult(alloc);
    navigate('/customer/request');
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Labour Cooperative Federation Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified skilled artisans backed by cooperative guarantees and fair ethical allocation.
          </p>
        </div>

        {/* Location & Language Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Bilaspur, CG</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded ml-1">Mock GPS</span>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedLang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('hi')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedLang === 'hi' ? 'bg-white text-brand-700 shadow-sm font-bold' : 'text-slate-500'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Active Service Section (When an active job exists) */}
      {activeBooking && (
        <div className="mb-10 bg-white rounded-3xl border-2 border-brand-500 shadow-xl overflow-hidden animate-in fade-in duration-300">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span>ACTIVE SERVICE IN PROGRESS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Booking #{activeBooking.id}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                <strong className="text-white">{activeBooking.service}</strong>: {activeBooking.task}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 bg-slate-800/80 p-3 sm:p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Amount</span>
              <span className="text-xl sm:text-2xl font-black text-brand-300">₹{activeBooking.estimatedAmount}</span>
              <span className="text-[9px] text-slate-400 hidden sm:block">Coop welfare fee included</span>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Assigned Worker Card */}
              <div className="lg:col-span-1 space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  Assigned Worker
                </span>

                {assignedWorker ? (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center">
                    <div className="relative inline-block mx-auto mb-3">
                      <img
                        src={assignedWorker.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
                        alt={assignedWorker.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow mx-auto"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{assignedWorker.name}</h3>
                    <p className="text-xs font-semibold text-brand-600">{assignedWorker.skill}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{assignedWorker.cooperativeName}</p>

                    <div className="flex items-center justify-center gap-2 mt-2 text-xs">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{assignedWorker.rating.toFixed(1)}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">{assignedWorker.experienceYears} yrs exp</span>
                      <span>•</span>
                      <span className="text-slate-500">{assignedWorker.distance.toFixed(1)} km</span>
                    </div>

                    <div className="mt-3 p-2 bg-brand-50 border border-brand-200 rounded-xl text-center">
                      <span className="text-[10px] text-brand-800 font-bold block">
                        Fair Allocation Score: {activeBooking.assignedWorker?.allocationPercentage || 86}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center text-xs text-slate-500">
                    Artisan assigned via fair engine
                  </div>
                )}
              </div>

              {/* Right Column: Live Status & Interactive Actions */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-2">
                    Current Status &amp; Timeline
                  </span>

                  {/* Status Banner */}
                  <div className="mb-4 p-4 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white border-slate-800">
                    <div>
                      <p className="text-brand-300 font-bold uppercase text-[11px]">
                        Status: {activeBooking.status.replace('_', ' ')}
                      </p>
                      <p className="text-slate-300 text-xs mt-0.5">
                        {(activeBooking.status === 'requested' || activeBooking.status === 'assigned') && (
                          <span>Request dispatched. Waiting for <strong>{assignedWorker?.name}</strong> to accept in Worker Portal.</span>
                        )}
                        {activeBooking.status === 'accepted' && (
                          <span><strong>{assignedWorker?.name}</strong> has accepted! Worker is en route to {activeBooking.customerLocation}.</span>
                        )}
                        {activeBooking.status === 'in_progress' && (
                          <span><strong>{assignedWorker?.name}</strong> is currently on-site performing diagnostics &amp; repairs.</span>
                        )}
                        {(activeBooking.status === 'completed' || activeBooking.status === 'payment_pending') && (
                          <span>Service completed! Please complete mock payment below.</span>
                        )}
                        {activeBooking.status === 'paid' && (
                          <span>Payment settled. Thank you for supporting cooperative artisans!</span>
                        )}
                        {activeBooking.status === 'closed' && (
                          <span>Service verified &amp; recorded in cooperative ledger.</span>
                        )}
                      </p>
                    </div>

                    <button
                      onClick={handleJumpToWorker}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto shrink-0 text-xs"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Open Worker View</span>
                    </button>
                  </div>

                  {/* Status Timeline */}
                  <StatusTimeline
                    status={activeBooking.status}
                    createdAt={activeBooking.createdAt}
                    acceptedAt={activeBooking.acceptedAt}
                    startedAt={activeBooking.startedAt}
                    completedAt={activeBooking.completedAt}
                  />
                </div>

                {/* Direct Action Context: Pay Now if completed */}
                {(activeBooking.status === 'completed' || activeBooking.status === 'payment_pending') && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">Service Completed — Payment Required</h4>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Amount: <strong>₹{activeBooking.estimatedAmount}</strong> (90% to {assignedWorker?.name}, 10% to Coop fund)
                      </p>
                    </div>
                    <button
                      onClick={handlePayNow}
                      className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all self-start sm:self-auto"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>PAY NOW (₹{activeBooking.estimatedAmount})</span>
                    </button>
                  </div>
                )}

                {/* Bottom Navigation Links */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigate('/customer/status')}
                    className="text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                  >
                    <span>View Full Booking Details &amp; Tracking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleJumpToWorker}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Switch to Worker view to simulate actions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeBooking && (
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Need another service? Search or request below
          </span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>
      )}

      {/* Large Smart Search Request Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl mb-10 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {selectedLang === 'hi' ? 'अपनी सेवा आवश्यकता बताएं (AI समझ)' : 'Natural Language Service Request'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Local rule-based NLP • English &amp; Hindi
          </span>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              selectedLang === 'hi'
                ? 'उदा. "मुझे सीलिंग फैन रिपेयर के लिए इलेक्ट्रीशियन चाहिए" या "नल का पाइप लीक हो रहा है तुरंत प्लंबर भेजो"...'
                : 'e.g. "I need an electrician to repair my ceiling fan" or "Urgent plumber for kitchen pipe leak"...'
            }
            className="w-full text-base sm:text-lg p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none transition-all placeholder:text-slate-400 resize-none font-medium"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Fair Job Allocation Engine active • Max 10km radius</span>
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <span>{selectedLang === 'hi' ? 'सेवा खोजें एवं आवंटित करें' : 'Analyze Request & Match'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Clickable Quick Prompts */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 mb-2.5">
            {selectedLang === 'hi' ? 'त्वरित उदाहरण आजमाएं:' : 'Quick Demo Examples (Click to run):'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickPrompt('I need an electrician to repair my ceiling fan.')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors text-left"
            >
              ⚡ "I need an electrician to repair my ceiling fan."
            </button>

            <button
              type="button"
              onClick={() => handleQuickPrompt('Mujhe electrician chahiye fan repair karwana hai.')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors text-left"
            >
              🇮🇳 "Mujhe electrician chahiye fan repair karwana hai."
            </button>

            <button
              type="button"
              onClick={() => handleQuickPrompt('Urgent pipe leakage in kitchen bathroom.')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors text-left"
            >
              🔧 "Urgent pipe leakage in kitchen bathroom."
            </button>

            <button
              type="button"
              onClick={() => handleQuickPrompt('Carpenter needed for door lock repair.')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors text-left"
            >
              🪚 "Carpenter needed for door lock repair."
            </button>
          </div>
        </div>
      </div>

      {/* Popular Cooperative Services */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Popular Cooperative Services</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a service category to trigger automatic skill matching &amp; fair allocation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              onClick={() => handleCategoryClick(srv.category, srv.popularTasks[0])}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${srv.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">
                    From ₹{srv.basePrice}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors">
                  {selectedLang === 'hi' ? srv.hindiTitle : srv.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {srv.description}
                </p>

                {/* Popular task pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {srv.popularTasks.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
                <span>Request {srv.category}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
