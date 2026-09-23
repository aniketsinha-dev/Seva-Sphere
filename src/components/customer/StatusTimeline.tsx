import React from 'react';
import { BookingStatus } from '../../types';
import { CheckCircle2, Clock, PlayCircle, CheckCheck, UserCheck } from 'lucide-react';

interface StatusTimelineProps {
  status: BookingStatus;
  createdAt?: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  status,
  createdAt = '10:15 AM',
  acceptedAt = '10:18 AM',
  startedAt = '10:35 AM',
  completedAt = '11:15 AM'
}) => {
  const steps = [
    {
      id: 'requested',
      title: 'Request Dispatched',
      description: 'Dispatched to allocated worker • Waiting for worker acceptance',
      time: createdAt,
      icon: CheckCircle2,
      isDone: true,
      isActive: status === 'requested' || status === 'assigned'
    },
    {
      id: 'accepted',
      title: 'Worker Accepted & En Route',
      description: 'Worker confirmed appointment and is on the way',
      time: acceptedAt,
      icon: Clock,
      isDone: ['accepted', 'in_progress', 'completed', 'payment_pending', 'paid', 'closed', 'reviewed'].includes(status),
      isActive: status === 'accepted'
    },
    {
      id: 'in_progress',
      title: 'Service In Progress',
      description: 'Worker is on-site performing diagnostics & repairs',
      time: startedAt,
      icon: PlayCircle,
      isDone: ['in_progress', 'completed', 'payment_pending', 'paid', 'closed', 'reviewed'].includes(status),
      isActive: status === 'in_progress'
    },
    {
      id: 'completed',
      title: 'Service Completed',
      description: 'Job finished, customer inspection verified',
      time: completedAt,
      icon: CheckCheck,
      isDone: ['completed', 'payment_pending', 'paid', 'closed', 'reviewed'].includes(status),
      isActive: status === 'completed' || status === 'payment_pending'
    },
    {
      id: 'paid',
      title: 'Payment & Job Closed',
      description: 'Cooperative fee & direct worker payout settled',
      time: completedAt,
      icon: UserCheck,
      isDone: ['paid', 'closed', 'reviewed'].includes(status),
      isActive: status === 'paid' || status === 'closed' || status === 'reviewed'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center justify-between">
        <span>Job Progress Timeline</span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 uppercase">
          Live Synced State
        </span>
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex items-start gap-4">
              {/* Bullet / Icon */}
              <div
                className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                  step.isDone
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-50'
                    : step.isActive
                    ? 'bg-brand-500 text-white ring-4 ring-brand-100 animate-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {step.isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Text info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold ${
                      step.isDone
                        ? 'text-slate-900'
                        : step.isActive
                        ? 'text-brand-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.isDone && (
                    <span className="text-[11px] text-slate-400 font-mono">{step.time}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
