import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusTimeline } from '../../components/customer/StatusTimeline';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  MessageSquare,
  IndianRupee,
  CreditCard,
  Send,
  ArrowRight,
  ExternalLink,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const BookingStatus: React.FC = () => {
  const {
    activeBooking,
    acceptBooking,
    startService,
    completeService,
    simulatePayment,
    submitReview,
    setRole
  } = useApp();
  const navigate = useNavigate();

  // Review states
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('Excellent service, arrived on time and fixed the issue smoothly.');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!activeBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800">No Active Booking Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Request a service and assign a worker to track live progress.
        </p>
        <button
          onClick={() => navigate('/customer')}
          className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl text-sm"
        >
          Book a Service Now
        </button>
      </div>
    );
  }

  const worker = activeBooking.assignedWorker;

  const handlePay = () => {
    simulatePayment(activeBooking.id);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setTimeout(() => {
      const sanitized = reviewText.trim() || 'Service completed satisfactorily by cooperative professional.';
      submitReview(activeBooking.id, rating, sanitized);
      setIsSubmittingReview(false);
    }, 400);
  };

  const handleJumpToWorker = () => {
    setRole('worker');
    navigate('/worker');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {/* Top Booking Confirmed Banner */}
      <div className="bg-emerald-500 text-white rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>BOOKING CONFIRMED ✓</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Booking #{activeBooking.id}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Service: <strong>{activeBooking.service}</strong> ({activeBooking.task})
          </p>
        </div>

        <div className="bg-emerald-600/60 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-emerald-400/40 text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
          <span className="text-[11px] text-emerald-200 block uppercase font-semibold">Estimated Amount</span>
          <span className="text-2xl font-extrabold text-white">₹{activeBooking.estimatedAmount}</span>
          <span className="text-[10px] text-emerald-200 hidden sm:block">Includes Coop welfare fund</span>
        </div>
      </div>

      {/* Connected Multi-Role Banner */}
      <div className="mb-6 sm:mb-8 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping mt-1 sm:mt-0 shrink-0" />
          <div>
            <p className="font-bold text-brand-300">Live Shared Job #{activeBooking.id}:</p>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Current Status: <strong className="text-white uppercase font-bold">{activeBooking.status.replace('_', ' ')}</strong>.
              {(activeBooking.status === 'requested' || activeBooking.status === 'assigned') && (
                <span> Dispatched to <strong>{worker?.name}</strong>. Switch to Worker Portal to accept.</span>
              )}
              {activeBooking.status === 'accepted' && (
                <span> <strong>{worker?.name}</strong> accepted! Worker can start the service.</span>
              )}
              {activeBooking.status === 'in_progress' && (
                <span> <strong>{worker?.name}</strong> is currently on-site performing repairs.</span>
              )}
              {activeBooking.status === 'completed' && (
                <span> Service complete! Complete payment below.</span>
              )}
              {activeBooking.status === 'paid' && (
                <span> Payment settled. Please rate your experience.</span>
              )}
              {activeBooking.status === 'closed' && (
                <span> Job closed & verified.</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleJumpToWorker}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Worker View</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Assigned Worker Details */}
        <div className="lg:col-span-1 space-y-6">
          {worker ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
                Assigned Artisan
              </span>

              <div className="text-center pb-5 border-b border-slate-100">
                <div className="relative inline-block">
                  <img
                    src={worker.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'}
                    alt={worker.name}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md mx-auto"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">{worker.name}</h3>
                <p className="text-xs font-semibold text-brand-600">{worker.skill}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{worker.cooperativeName}</p>

                <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{worker.rating.toFixed(1)}</span>
                  </span>
                  <span>•</span>
                  <span className="text-slate-500">{worker.experienceYears} yrs exp</span>
                  <span>•</span>
                  <span className="text-slate-500">{worker.distance.toFixed(1)} km</span>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="pt-4 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${worker.phone}`}
                  onClick={(e) => { e.preventDefault(); alert(`Simulated Call to ${worker.name}: ${worker.phone}`); }}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Call Worker</span>
                </a>

                <button
                  onClick={() => alert(`Simulated Message to ${worker.name}: "Worker is currently in transit."`)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                  <span>Chat</span>
                </button>
              </div>

              {/* Fair allocation badge */}
              <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-xl text-center">
                <span className="text-[11px] text-brand-800 font-semibold block">
                  Fair Allocation Score: {worker.allocationPercentage}%
                </span>
                <span className="text-[10px] text-brand-600 block mt-0.5">
                  Assigned by cooperative equity algorithm
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
              <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2 animate-spin" />
              <p className="text-xs text-slate-500">Assigning suitable worker...</p>
            </div>
          )}
        </div>

        {/* Right Column: Status Timeline & Payment / Review Actions */}
        <div className="lg:col-span-2 space-y-6">
          <StatusTimeline
            status={activeBooking.status}
            createdAt={activeBooking.createdAt}
            acceptedAt={activeBooking.acceptedAt}
            startedAt={activeBooking.startedAt}
            completedAt={activeBooking.completedAt}
          />

          {/* Current Status Highlights */}
          {(activeBooking.status === 'requested' || activeBooking.status === 'assigned') && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Waiting for Worker Acceptance</h4>
                  <p className="text-xs text-amber-800 mt-1">
                    Request dispatched to <strong>{worker?.name}</strong> via the Fair Job Allocation Engine.
                    Switch to the Worker role to accept this incoming job.
                  </p>
                </div>
              </div>
              <button
                onClick={handleJumpToWorker}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shrink-0 flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Go to Worker Portal</span>
              </button>
            </div>
          )}

          {activeBooking.status === 'accepted' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Worker En Route</h4>
                <p className="text-xs text-emerald-800 mt-1">
                  {worker?.name} has accepted the service request and is traveling to your location ({activeBooking.customerLocation}).
                </p>
              </div>
            </div>
          )}

          {activeBooking.status === 'in_progress' && (
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold text-brand-900">Service in Progress</h4>
                <p className="text-xs text-brand-800 mt-1">
                  Diagnostics &amp; repairs underway. Once completed, the worker will finalize the job.
                </p>
              </div>
            </div>
          )}

          {activeBooking.status === 'declined' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900">Worker Unavailable</h4>
                <p className="text-xs text-red-800 mt-1">
                  The allocated artisan was unable to take this request. You can re-evaluate the cooperative pool.
                </p>
                <button
                  onClick={() => navigate('/customer/matching')}
                  className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Re-evaluate Available Workers
                </button>
              </div>
            </div>
          )}

          {/* Payment Simulation Section (Appears when completed) */}
          {activeBooking.status === 'completed' && activeBooking.paymentStatus === 'unpaid' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-500 shadow-xl space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Payment Due: Service Completed</h3>
                    <p className="text-xs text-slate-400">Prototype Transparent Payout Simulation</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                  Pending Payment
                </span>
              </div>

              {/* Transparent Bill Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Gross Service Amount:</span>
                  <span className="font-bold text-slate-900">₹{activeBooking.estimatedAmount}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-1">
                    <span>Cooperative Welfare Fund (10%):</span>
                    <span className="text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">
                      Insurance &amp; Tools
                    </span>
                  </span>
                  <span className="font-semibold text-slate-700">₹{activeBooking.cooperativeFee}</span>
                </div>

                <div className="flex justify-between items-center text-emerald-800 font-bold pt-2 border-t border-slate-200">
                  <span>Direct Worker Payout (90%):</span>
                  <span className="text-base text-emerald-700">₹{activeBooking.workerPayout}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                * Zero predatory commission. The 10% cooperative contribution funds member healthcare, collective tool purchase, and welfare.
              </p>

              <button
                onClick={handlePay}
                className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-101"
              >
                <CreditCard className="w-5 h-5" />
                <span>PAY NOW (₹{activeBooking.estimatedAmount})</span>
              </button>
            </div>
          )}

          {/* Payment Completed Notice */}
          {activeBooking.paymentStatus === 'paid' && activeBooking.status !== 'closed' && activeBooking.status !== 'reviewed' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">✓ Payment Successful</h4>
                  <p className="text-xs text-emerald-700">₹{activeBooking.workerPayout} credited directly to {worker?.name}.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                PAID
              </span>
            </div>
          )}

          {/* Review Submission Section (Appears after payment) */}
          {(activeBooking.status === 'paid' || activeBooking.paymentStatus === 'paid') && activeBooking.status !== 'closed' && activeBooking.status !== 'reviewed' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Rate Your Service Experience</h3>
                <p className="text-xs text-slate-500">
                  Your review directly updates cooperative trust ratings and future fair allocation index.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star rating selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-115 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-slate-700 ml-2">{rating}.0 / 5.0</span>
                  </div>
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Review Feedback</label>
                  <textarea
                    rows={2}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="Share feedback on punctuality, skill quality, and conduct..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingReview ? 'Submitting Review...' : 'Submit Review'}</span>
                </button>
              </form>
            </div>
          )}

          {/* Review Completed State */}
          {(activeBooking.status === 'closed' || activeBooking.status === 'reviewed') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Review Submitted ✓</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you! Your feedback has been recorded in the cooperative ledger and will help maintain fair allocation scores.
              </p>

              <div className="inline-flex items-center gap-1.5 text-amber-500 text-sm font-bold pt-1">
                {[...Array(activeBooking.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-slate-700 ml-1">"{activeBooking.review}"</span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/customer')}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
