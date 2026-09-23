import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, UserCheck } from 'lucide-react';

interface StatusBadgeProps {
  type: 'verified' | 'online' | 'offline' | 'urgent' | 'underutilized' | 'status';
  statusText?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, statusText, className = '' }) => {
  switch (type) {
    case 'verified':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Member</span>
        </span>
      );

    case 'online':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Online & Available</span>
        </span>
      );

    case 'offline':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span>Offline</span>
        </span>
      );

    case 'urgent':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 ${className}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>High Urgency</span>
        </span>
      );

    case 'underutilized':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200 ${className}`}>
          <UserCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Fair Allocation Boost (0-1 Recent Jobs)</span>
        </span>
      );

    case 'status':
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{statusText || 'Pending'}</span>
        </span>
      );

    default:
      return null;
  }
};
