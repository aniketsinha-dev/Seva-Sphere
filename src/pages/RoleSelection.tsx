import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Users,
  Briefcase,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const handleSelect = (selectedRole: 'customer' | 'worker' | 'cooperative') => {
    setRole(selectedRole);
    if (selectedRole === 'customer') navigate('/customer');
    if (selectedRole === 'worker') navigate('/worker');
    if (selectedRole === 'cooperative') navigate('/cooperative');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Interactive Demo Gateway</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SEVA <span className="text-brand-600">SPHERE</span>
          </h1>
          <p className="text-slate-600 mt-2 text-base max-w-md mx-auto">
            How do you want to experience the platform today?
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Switch between roles at any time during the live evaluation.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Card */}
          <div
            onClick={() => handleSelect('customer')}
            className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Users className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Consumer Portal
              </span>
              <h3 className="text-xl font-bold text-slate-900">Customer</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Book verified services using natural voice or text, inspect the Fair Allocation Engine, and confirm jobs.
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>AI request understanding (EN/HI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Live fairness score breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Simulated payment & ratings</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button className="w-full py-3 rounded-xl bg-slate-100 group-hover:bg-brand-500 text-slate-800 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <span>Enter as Customer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Worker Card */}
          <div
            onClick={() => handleSelect('worker')}
            className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Briefcase className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                Skilled Member
              </span>
              <h3 className="text-xl font-bold text-slate-900">Worker</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Experience the cooperative member view (Raj Kumar), receive allocated jobs, accept, and complete work.
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Incoming job accept / decline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Start service & job completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time earnings & fairness tier</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button className="w-full py-3 rounded-xl bg-slate-100 group-hover:bg-emerald-600 text-slate-800 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <span>Enter as Worker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cooperative Admin Card */}
          <div
            onClick={() => handleSelect('cooperative')}
            className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Building2 className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                Federation Admin
              </span>
              <h3 className="text-xl font-bold text-slate-900">Cooperative</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Oversee worker rosters, audit algorithmic distribution charts, and ensure cooperative governance.
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Worker roster & verification manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Workload distribution balance chart</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Fair allocation audit logs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button className="w-full py-3 rounded-xl bg-slate-100 group-hover:bg-indigo-600 text-slate-800 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <span>Enter as Cooperative</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Honesty Notice */}
        <div className="mt-10 bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
          <Info className="w-5 h-5 text-slate-500 shrink-0" />
          <p>
            <strong>Evaluation Note:</strong> No password or real OTP required. State is persisted in
            your browser session and automatically synchronizes when switching roles.
          </p>
        </div>
      </div>
    </div>
  );
};
