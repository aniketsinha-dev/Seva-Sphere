import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Zap,
  Wrench,
  Users,
  Briefcase,
  Building2,
  ChevronUp,
  ChevronDown,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const DemoControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const {
    role,
    setRole,
    resetDemo,
    launchPresetElectricianDemo,
    launchPresetPlumberDemo,
    activeBooking,
    activeWorkerId,
    workers
  } = useApp();
  const navigate = useNavigate();

  const assignedWorkerName = activeBooking?.workerName?.split(' ')[0] || workers.find(w => w.id === activeWorkerId)?.name?.split(' ')[0] || 'Worker';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    resetDemo();
    showToast('Demo environment reset successfully! All workers & bookings restored.');
    navigate('/customer');
  };

  const handleElectricianDemo = () => {
    launchPresetElectricianDemo();
    setRole('customer');
    showToast('Loaded Electrician Demo: "I need an electrician to repair my ceiling fan."');
    navigate('/customer/request');
  };

  const handlePlumberDemo = () => {
    launchPresetPlumberDemo();
    setRole('customer');
    showToast('Loaded Plumber Demo: "Urgent pipe leakage in kitchen bathroom."');
    navigate('/customer/request');
  };

  const handleRoleJump = (targetRole: 'customer' | 'worker' | 'cooperative') => {
    setRole(targetRole);
    if (targetRole === 'customer') navigate('/customer');
    if (targetRole === 'worker') navigate('/worker');
    if (targetRole === 'cooperative') navigate('/cooperative');
    showToast(`Switched view to ${targetRole.toUpperCase()}`);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Toolbar Container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-none">
        <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 sm:p-3 pointer-events-auto transition-all">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-brand-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Hackathon Demo Bar
              </span>
              {activeBooking && (
                <span className="hidden md:inline text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Job #{activeBooking.id}: {activeBooking.status.replace('_', ' ')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                title={isOpen ? 'Minimize bar' : 'Expand bar'}
              >
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                <span className="text-[11px] hidden sm:inline">{isOpen ? 'Hide' : 'Quick Actions'}</span>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              {/* Scenario Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">1-Click Scenarios:</span>
                <button
                  onClick={handleElectricianDemo}
                  className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Electrician (Fan Repair)</span>
                </button>

                <button
                  onClick={handlePlumberDemo}
                  className="px-2.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Plumber (Urgent Leak)</span>
                </button>
              </div>

              {/* Quick Role Jump & Reset */}
              <div className="flex items-center gap-1.5">
                <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
                  <button
                    onClick={() => handleRoleJump('customer')}
                    className={`px-2 py-1 rounded-md transition-colors ${role === 'customer' ? 'bg-brand-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => handleRoleJump('worker')}
                    className={`px-2 py-1 rounded-md transition-colors ${role === 'worker' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                  >
                    Worker ({assignedWorkerName})
                  </button>
                  <button
                    onClick={() => handleRoleJump('cooperative')}
                    className={`px-2 py-1 rounded-md transition-colors ${role === 'cooperative' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                  >
                    Cooperative
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="px-2.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Reset state, clear bookings & reload default workers"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
