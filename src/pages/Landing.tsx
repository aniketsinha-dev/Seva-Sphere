import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Scale,
  ShieldCheck,
  HeartHandshake,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Cpu,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e15_1px,transparent_1px),linear-gradient(to_bottom,#0f766e15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-6 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>Cooperative-Owned Digital Public Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Fairer opportunities. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-teal-200 to-emerald-400">
              Trusted services.
            </span> <br />
            Stronger cooperatives.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            A cooperative-owned digital marketplace connecting consumers with verified skilled workers
            associated with Labour Cooperative Federations through intelligent and fair job allocation.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/customer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-base shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              to="/worker"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-brand-400" />
              <span>Join as Worker</span>
            </Link>

            <Link
              to="/role-selection"
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-slate-300 hover:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Roles &raquo;</span>
            </Link>
          </div>

          {/* Conceptual Architecture Flow Diagram */}
          <div className="mt-16 bg-slate-850/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 max-w-3xl mx-auto shadow-2xl">
            <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">
              System Flow Concept
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Step 1</span>
                <p className="text-sm font-bold text-white">Customer</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Natural voice/text request</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-xs font-semibold text-brand-400 block mb-1">Step 2</span>
                <p className="text-sm font-bold text-white">Seva Sphere</p>
                <p className="text-[11px] text-slate-400 mt-0.5">AI Intent & location match</p>
              </div>

              <div className="bg-brand-950/80 p-3.5 rounded-xl border border-brand-500/50 shadow-inner">
                <span className="text-xs font-semibold text-brand-300 block mb-1">Core Engine</span>
                <p className="text-sm font-bold text-brand-300">Fair Allocation</p>
                <p className="text-[11px] text-brand-200/80 mt-0.5">Equity, distance & rating</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-xs font-semibold text-emerald-400 block mb-1">Step 4</span>
                <p className="text-sm font-bold text-white">Coop Worker</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Balanced job distribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Highlights & How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Why Cooperative-Owned Digital Marketplaces Win
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Private aggregators extract heavy 25–35% commissions and rely on winner-takes-all algorithmic dispatch.
            Seva Sphere shifts ownership to Labour Federations with full mathematical fairness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Fair Job Allocation Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No worker is left behind. Allocation evaluates 40% workload equity (boosting underutilized workers),
              30% distance proximity, and 30% rating.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Federation-Verified Workers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every professional is an authenticated member of registered Labour Cooperative Societies,
              ensuring certified skills, identity vetting, and police verification.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Worker Welfare & Dignity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent 10% cooperative fee feeds directly into collective accident insurance, pension,
              and tool upgrade funds rather than corporate venture profit.
            </p>
          </div>
        </div>

        {/* Feature Grid: AI + Cooperative Management */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-2xl p-8 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-800/80 text-teal-300 text-xs font-semibold mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI-Assisted Multilingual Access</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Democratizing Access in Local Languages</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Consumers and workers can speak or type in English, Hindi, and Hinglish. Natural language understanding
              automatically maps tasks, urgency, and pricing without cumbersome menus.
            </p>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs font-mono text-teal-300">
              "Mujhe electrician chahiye fan repair karwane" &rarr; Category: Electrician | Urgency: Normal
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-8 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-800/80 text-indigo-300 text-xs font-semibold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Cooperative Administration</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Real-Time Cooperative Governance</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Federation administrators monitor worker rosters, verify credentials, monitor job distribution
              equity, and prevent algorithmic exploitation through live dashboards.
            </p>
            <div className="flex items-center gap-3 text-xs text-indigo-200">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 124 Registered</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 96 Verified</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 31 Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-10 px-4 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-bold text-white">SEVA SPHERE</span>
            <span>— Prototype for Labour Cooperative Digital Empowerment</span>
          </div>

          <p className="text-slate-400">
            Smart India Hackathon Prototype • Bilaspur Region Pilot Simulation
          </p>
        </div>
      </footer>
    </div>
  );
};
