import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Briefcase,
  Building2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, activeBooking } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'customer' | 'worker' | 'cooperative') => {
    setRole(newRole);
    if (newRole === 'customer') {
      navigate('/customer');
    } else if (newRole === 'worker') {
      navigate('/worker');
    } else if (newRole === 'cooperative') {
      navigate('/cooperative');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Prototype Notice Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white text-[11px] py-1 px-4 text-center flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 font-semibold text-brand-300">
          <Shield className="w-3.5 h-3.5" /> SIH Prototype Simulation
        </span>
        <span className="hidden sm:inline text-slate-300">|</span>
        <span className="hidden sm:inline text-slate-300">
          Empowering Labour Cooperative Federations with Fair Algorithmic Job Allocation
        </span>
        <span className="hidden md:inline bg-teal-800/80 px-2 py-0.5 rounded text-[10px] text-teal-200 border border-teal-700">
          Mock Data & Verified Simulation
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  SEVA <span className="text-brand-600">SPHERE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-brand-100 text-brand-800 border border-brand-200">
                  Coop
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Fairer opportunities • Trusted services • Stronger cooperatives
              </p>
            </div>
          </Link>

          {/* Active Booking Live Pill */}
          {activeBooking && (
            <Link
              to={role === 'worker' ? '/worker' : '/customer/status'}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors shadow-sm"
              title="Click to view ongoing booking"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>
                Active Job: <strong className="capitalize">{activeBooking.service}</strong> ({activeBooking.status.replace('_', ' ')})
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* Role Navigation Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleRoleChange('customer')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'customer' && location.pathname.startsWith('/customer')
                  ? 'bg-white text-brand-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              onClick={() => handleRoleChange('worker')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'worker' || location.pathname.startsWith('/worker')
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Worker</span>
              {activeBooking && (activeBooking.status === 'requested' || activeBooking.status === 'assigned' || activeBooking.status === 'accepted' || activeBooking.status === 'in_progress') && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => handleRoleChange('cooperative')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'cooperative' || location.pathname.startsWith('/cooperative')
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Coop</span>
            </button>
          </div>

          {/* Quick Landing / Roles Link */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/role-selection"
              className="text-xs font-semibold text-slate-600 hover:text-brand-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Switch View</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
