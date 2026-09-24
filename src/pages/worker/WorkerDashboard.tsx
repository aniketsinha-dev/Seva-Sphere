import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Briefcase,
  IndianRupee,
  Star,
  Scale,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  PlayCircle,
  CheckCheck,
  ShieldCheck,
  TrendingUp,
  User,
  Power,
  AlertTriangle,
  Award,
  Phone
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const {
    workers,
    activeWorkerId,
    setActiveWorkerId,
    activeBooking,
    acceptBooking,
    declineBooking,
    startService,
    completeService,
    toggleWorkerAvailability
  } = useApp();
  const navigate = useNavigate();

  // Find the current active worker (defaults to Raj Kumar)
  const worker = workers.find((w) => w.id === activeWorkerId) || workers[0];

  // Dynamic greeting based on hour
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Check if there is an active job assigned to THIS worker
  const isJobForMe = activeBooking && activeBooking.assignedWorker?.id === worker.id;

  const handleDecline = () => {
    if (activeBooking) {
      declineBooking(activeBooking.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {/* Banner if job is assigned to another worker */}
      {activeBooking && activeBooking.assignedWorker && activeBooking.assignedWorker.id !== worker.id && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="text-amber-900">
              Active booking #{activeBooking.id} is assigned to <strong>{activeBooking.assignedWorker.name}</strong> ({activeBooking.assignedWorker.skill}).
            </span>
          </div>
          <button
            onClick={() => setActiveWorkerId(activeBooking.assignedWorker!.id)}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shrink-0 self-start sm:self-auto"
          >
            Switch to {activeBooking.assignedWorker.name}
          </button>
        </div>
      )}

      {/* Top Header & Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={worker.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow"
              />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${worker.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">
                  {greeting}, {worker.name.split(' ')[0]} 👋
                </h1>
                {worker.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {worker.skill} • {worker.cooperativeName} • Member #{worker.badge || '104'}
              </p>
            </div>
          </div>

          {/* Online/Offline Toggle & Worker Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Worker selector dropdown for hackathon testing */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs">
              <span className="text-[10px] text-slate-400 font-bold px-1.5 uppercase">Switch Worker:</span>
              <select
                value={worker.id}
                onChange={(e) => setActiveWorkerId(e.target.value)}
                className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
              >
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.skill} - {w.recentJobs} jobs)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => toggleWorkerAvailability(worker.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                worker.available
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{worker.available ? '🟢 ONLINE' : '⚪ OFFLINE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Today's Jobs"
          value={worker.recentJobs}
          subtitle="Assigned via fair engine"
          icon={Briefcase}
          badge="Balanced"
          badgeColor="teal"
          accentColor="bg-brand-600"
        />

        <StatCard
          title="Today's Earnings"
          value={`₹${worker.todayEarnings}`}
          subtitle="90% direct payout"
          icon={IndianRupee}
          badge="Direct Settlement"
          badgeColor="green"
          accentColor="bg-emerald-600"
        />

        <StatCard
          title="Worker Rating"
          value={`${worker.rating.toFixed(1)} ★`}
          subtitle="Cooperative standard compliant"
          icon={Star}
          badge="Top Rated"
          badgeColor="amber"
          accentColor="bg-amber-500"
        />

        <StatCard
          title="Allocation Index"
          value={`${Math.round((1 / (1 + worker.recentJobs)) * 100)}%`}
          subtitle="Dynamic fairness weight"
          icon={Scale}
          badge={worker.recentJobs <= 1 ? 'Underutilized Boost' : 'Normal Workload'}
          badgeColor="blue"
          accentColor="bg-indigo-600"
        />
      </div>

      {/* Main Jobs Section: Incoming / Active / History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Active / Incoming Job Container */}
          {isJobForMe && activeBooking ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-500 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-500 animate-ping" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {(activeBooking.status === 'requested' || activeBooking.status === 'assigned')
                      ? 'New Service Request (Incoming)'
                      : activeBooking.status === 'accepted'
                      ? 'Job Accepted • Travel to Location'
                      : activeBooking.status === 'in_progress'
                      ? 'Service in Progress'
                      : activeBooking.status === 'completed'
                      ? 'Job Completed • Awaiting Customer Payment'
                      : activeBooking.status === 'paid'
                      ? 'Payment Received ✓'
                      : 'Job Closed & Verified ✓'}
                  </h2>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {activeBooking.status.replace('_', ' ')}
                </span>
              </div>

              {/* Job Details Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Customer</span>
                    <p className="text-base font-bold text-slate-900">{activeBooking.customerName}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeBooking.customerLocation} (2.1 km away)</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Task &amp; Service</span>
                    <p className="text-base font-bold text-brand-700">{activeBooking.task}</p>
                    <p className="text-xs text-slate-500">Service: {activeBooking.service}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600">
                    Estimated Earnings: <strong className="text-emerald-700 font-bold">₹{activeBooking.workerPayout}</strong> (₹{activeBooking.estimatedAmount} gross)
                  </span>

                  <span className="bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-semibold">
                    Fairness Score: {activeBooking.assignedWorker?.allocationPercentage}%
                  </span>
                </div>
              </div>

              {/* Action Buttons based on state */}
              <div className="mt-6">
                {(activeBooking.status === 'requested' || activeBooking.status === 'assigned') && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => acceptBooking(activeBooking.id)}
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-101"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ACCEPT JOB</span>
                    </button>

                    <button
                      onClick={handleDecline}
                      className="py-3.5 px-6 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-semibold rounded-xl border border-slate-200 transition-colors"
                    >
                      DECLINE
                    </button>
                  </div>
                )}

                {activeBooking.status === 'accepted' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>✓ Job Accepted. Arrive at {activeBooking.customerLocation} and start work.</span>
                    </div>

                    <button
                      onClick={() => startService(activeBooking.id)}
                      className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-101"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>START JOB</span>
                    </button>
                  </div>
                )}

                {activeBooking.status === 'in_progress' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-600 shrink-0 animate-pulse" />
                      <span>Service in progress. Perform repairs safely.</span>
                    </div>

                    <button
                      onClick={() => completeService(activeBooking.id)}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-101"
                    >
                      <CheckCheck className="w-4 h-4" />
                      <span>MARK JOB COMPLETED</span>
                    </button>
                  </div>
                )}

                {activeBooking.status === 'completed' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-amber-600 mx-auto" />
                    <h4 className="font-bold text-amber-900">Job Marked Completed ✓</h4>
                    <p className="text-xs text-amber-800">
                      Waiting for customer payment of ₹{activeBooking.estimatedAmount}. Payout: <strong>₹{activeBooking.workerPayout}</strong>.
                    </p>
                  </div>
                )}

                {activeBooking.status === 'paid' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-900">Payment Received ✓</h4>
                    <p className="text-xs text-emerald-700">
                      ₹{activeBooking.workerPayout} has been credited to your cooperative account.
                    </p>
                  </div>
                )}

                {(activeBooking.status === 'closed' || activeBooking.status === 'reviewed') && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-900">Job Closed &amp; Verified ✓</h4>
                    <p className="text-xs text-emerald-700">
                      Customer Rating: <strong>{activeBooking.rating || 5}.0 ★</strong> — "{activeBooking.review || 'Excellent service'}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* No Active Job State */
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No New Job Requests Right Now</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                Your profile is active in the cooperative pool. When a customer nearby needs an {worker.skill},
                the Fair Allocation Engine will dispatch it to you based on your recent workload.
              </p>
              <button
                onClick={() => {
                  navigate('/customer');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Go to Customer Portal to create a request
              </button>
            </div>
          )}

          {/* Job History Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">Completed Jobs Today</h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Ceiling Fan Coil Replacement</p>
                  <p className="text-slate-400 text-[11px]">Vyapar Vihar • 09:30 AM</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700">+₹450</span>
                  <span className="text-[10px] text-slate-400 block">5.0 ★</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">MCB Tripping Diagnostic</p>
                  <p className="text-slate-400 text-[11px]">Nehru Nagar • 11:45 AM</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700">+₹400</span>
                  <span className="text-[10px] text-slate-400 block">4.8 ★</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Switchboard Socket Repair</p>
                  <p className="text-slate-400 text-[11px]">Torwa • 02:15 PM</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700">+₹400</span>
                  <span className="text-[10px] text-slate-400 block">4.5 ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Worker Profile, Federation & Welfare */}
        <div className="space-y-6">
          {/* Cooperative Member Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cooperative Verification
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Society Registry</span>
                <span className="font-bold text-slate-900">BLCF/2021/488</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Trade Skill Cert</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certified
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Experience</span>
                <span className="font-bold text-slate-900">{worker.experienceYears} Years</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Welfare Fund Status</span>
                <span className="text-emerald-700 font-bold">Active &amp; Insured</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Accident Cover</span>
                <span className="font-bold text-slate-900">₹2,00,000 (Coop)</span>
              </div>
            </div>
          </div>

          {/* Fairness Engine Explanation */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 mb-2 text-brand-300">
              <Scale className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">How Fair Allocation Helps You</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commercial marketplaces can concentrate opportunities among frequently selected workers. Seva Sphere's fair allocation mechanism considers recent workload to support more balanced job distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
