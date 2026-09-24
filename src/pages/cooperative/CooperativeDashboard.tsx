import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Building2,
  Users,
  ShieldCheck,
  Activity,
  Briefcase,
  TrendingUp,
  Scale,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ServiceCategory } from '../../types';

export const CooperativeDashboard: React.FC = () => {
  const { workers, toggleWorkerVerification, toggleWorkerAvailability, activeBooking, bookingHistory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter workers based on search and category
  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedFilter === 'all' || w.skill === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate live statistics
  const verifiedCount = workers.filter((w) => w.verified).length;
  const activeCount = workers.filter((w) => w.available).length;
  const totalJobsCompleted = workers.reduce((acc, curr) => acc + curr.recentJobs, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 mb-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bilaspur Labour Cooperative Federation (BLCF) Admin Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cooperative Governance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Digitally coordinate skilled workers, audit algorithmic equity, and monitor service delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl font-medium">
            Demo Mode • Mock Federation Data
          </span>
        </div>
      </div>

      {/* Demo Metrics Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Workers"
          value="124"
          subtitle="Registered Federation Members"
          icon={Users}
          badge="100% Cooperative"
          badgeColor="teal"
          accentColor="bg-brand-600"
        />

        <StatCard
          title="Verified Workers"
          value="96"
          subtitle="Police & Skill Certified"
          icon={ShieldCheck}
          badge="77% Verified"
          badgeColor="green"
          accentColor="bg-emerald-600"
        />

        <StatCard
          title="Active Workers"
          value="31"
          subtitle="Currently Online in Bilaspur"
          icon={Activity}
          badge="Live Roster"
          badgeColor="blue"
          accentColor="bg-blue-600"
        />

        <StatCard
          title="Jobs Today"
          value="48"
          subtitle="Distributed Fairly via Engine"
          icon={Briefcase}
          badge="0 Monopolies"
          badgeColor="amber"
          accentColor="bg-amber-600"
        />
      </div>

      {/* Live Cooperative Job Dispatch Monitor (Shared Job State) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
              <h2 className="text-lg font-bold text-slate-900">
                Live Job Dispatch &amp; Allocation Pipeline
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real-time audit log of the shared job state across Consumer and Worker spaces.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200 self-start">
            Connected Shared State
          </span>
        </div>

        {activeBooking ? (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Job #{activeBooking.id}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {activeBooking.service}
                  </span>
                  <span className="text-xs text-slate-600">({activeBooking.task})</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                  <span>Customer: <strong className="text-slate-800">{activeBooking.customerName}</strong> ({activeBooking.customerLocation})</span>
                  <span>•</span>
                  <span>Assigned Artisan: <strong className="text-slate-800">{activeBooking.assignedWorker?.name || 'Allocating...'}</strong></span>
                  <span>•</span>
                  <span>Tariff: <strong className="text-emerald-700 font-bold">₹{activeBooking.estimatedAmount}</strong> (Coop Fund: ₹{activeBooking.cooperativeFee})</span>
                </div>
              </div>

              {/* Status pill matching requirement */}
              <div className="text-left md:text-right shrink-0">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">
                  Shared Lifecycle Status
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  activeBooking.status === 'requested' || activeBooking.status === 'assigned'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                    : activeBooking.status === 'accepted'
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : activeBooking.status === 'in_progress'
                    ? 'bg-brand-50 text-brand-800 border-brand-300'
                    : activeBooking.status === 'completed'
                    ? 'bg-purple-50 text-purple-800 border-purple-300'
                    : activeBooking.status === 'paid'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span>
                    {activeBooking.status === 'requested' || activeBooking.status === 'assigned'
                      ? 'New / Requested'
                      : activeBooking.status === 'accepted'
                      ? 'Accepted'
                      : activeBooking.status === 'in_progress'
                      ? 'In Progress'
                      : activeBooking.status === 'completed'
                      ? 'Completed'
                      : activeBooking.status === 'paid'
                      ? 'Paid'
                      : 'Closed'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500">
              No active job in dispatch pipeline. When a consumer requests a service, the live allocation and real-time status will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Visual Job Distribution & Workload Balance Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Workload Distribution Equity Monitor
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visual proof of fair allocation: prevents superstar monopolization by giving underutilized workers higher fairness scores.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200 self-start">
            Target Max Spread: ≤ 8 Jobs/Day
          </span>
        </div>

        {/* Workload Bar Chart Visualization */}
        <div className="space-y-3">
          {workers.slice(0, 7).map((w) => {
            const maxRecent = 10;
            const percentage = Math.min(100, (w.recentJobs / maxRecent) * 100);
            return (
              <div key={w.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="w-full sm:w-44 shrink-0">
                  <span className="font-bold text-slate-900 text-xs block truncate">{w.name}</span>
                  <span className="text-[11px] text-slate-400">{w.skill} • {w.rating} ★</span>
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        w.recentJobs >= 8
                          ? 'bg-amber-500'
                          : w.recentJobs === 0
                          ? 'bg-slate-300'
                          : 'bg-brand-500'
                      }`}
                      style={{ width: `${Math.max(8, percentage)}%` }}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-36 text-left sm:text-right shrink-0 flex items-center justify-between sm:justify-end gap-2 text-xs">
                  <span className="font-bold text-slate-800">{w.recentJobs} jobs</span>
                  <span className="text-[10px] text-slate-400">
                    ({Math.round((1 / (1 + w.recentJobs)) * 100)}% fairness)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>* High recent workload workers receive lowered fairness weighting to share incoming requests.</span>
          <span className="text-emerald-700 font-semibold">Gini Coefficient (Equity Index): 0.21 (Optimal)</span>
        </div>
      </div>

      {/* Worker Roster & Verification Management Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Worker Roster &amp; Verification</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live database of cooperative members. Click badges to toggle verification or availability.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search artisan or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All Skills</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Painter">Painter</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Worker</th>
                <th className="pb-3 font-semibold">Trade Skill</th>
                <th className="pb-3 font-semibold">Verification</th>
                <th className="pb-3 font-semibold">Availability</th>
                <th className="pb-3 font-semibold">Recent Jobs</th>
                <th className="pb-3 font-semibold">Rating</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
                        alt={w.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{w.name}</span>
                        <span className="text-[11px] text-slate-400">{w.location}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {w.skill}
                    </span>
                  </td>

                  <td className="py-3.5 pr-4">
                    <button
                      onClick={() => toggleWorkerVerification(w.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-transform active:scale-95 ${
                        w.verified
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                      title="Click to toggle verification status"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{w.verified ? 'Verified' : 'Pending'}</span>
                    </button>
                  </td>

                  <td className="py-3.5 pr-4">
                    <button
                      onClick={() => toggleWorkerAvailability(w.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-transform active:scale-95 ${
                        w.available
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                      title="Click to toggle availability"
                    >
                      <span className={`w-2 h-2 rounded-full ${w.available ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span>{w.available ? 'Online' : 'Offline'}</span>
                    </button>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className="font-bold text-slate-800">{w.recentJobs}</span>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className="font-bold text-slate-800">{w.rating.toFixed(1)} ★</span>
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        alert(`Auditing Worker Record: ${w.name}\nCooperative ID: BLCF-${w.id}\nSkills: ${w.skill}\nExperience: ${w.experienceYears} yrs`);
                      }}
                      className="text-xs text-brand-600 hover:text-brand-800 font-bold hover:underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
