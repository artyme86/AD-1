import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, MapPin, User, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const C6CoachSchedule: React.FC = () => {
  const {
    sessionRequests,
    updateSessionRequestStatus,
    sessionSlots,
    toggleSlotAvailability,
    setFlowStep
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'calendar' | 'availability'>('requests');
  const [proposeModalRequestId, setProposeModalRequestId] = useState<string | null>(null);
  const [alternateTimeInput, setAlternateTimeInput] = useState('Wednesday 17:00 – 18:00');

  const pendingRequests = sessionRequests.filter((r) => r.status === 'Pending');
  const acceptedSessions = sessionRequests.filter((r) => r.status === 'Accepted');

  const handleAccept = (requestId: string) => {
    updateSessionRequestStatus(requestId, 'Accepted');
  };

  const handleDecline = (requestId: string) => {
    updateSessionRequestStatus(requestId, 'Declined');
  };

  const handleProposeTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposeModalRequestId) return;
    updateSessionRequestStatus(proposeModalRequestId, 'New time proposed', alternateTimeInput);
    setProposeModalRequestId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>INDIVIDUAL PORTAL</span>
            <span>/</span>
            <span>SESSION REQUESTS</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">C6 SCHEDULE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Private Session Inquiries & Calendar Dispatch
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Review parent booking requests, manage weekly pitch time slots, and confirm youth training sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Provider View" />
          <button
            onClick={() => setFlowStep('C5')}
            className="btn-action text-xs"
          >
            VIEW AS PARENT (C5)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border border-[var(--border-color)] bg-[var(--inset-bg)]">
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
              : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
          }`}
        >
          <span>INCOMING REQUESTS</span>
          <span className="text-[10px] font-mono px-1.5 border border-[var(--border-color)]">
            {pendingRequests.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
            activeTab === 'calendar'
              ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
              : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
          }`}
        >
          <span>WEEKLY CALENDAR</span>
          <span className="text-[10px] font-mono px-1.5 border border-[var(--border-color)]">
            {acceptedSessions.length} confirmed
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('availability')}
          className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'availability'
              ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
              : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
          }`}
        >
          <span>SLOT AVAILABILITY EDITOR</span>
        </button>
      </div>

      {/* Tab 1: Incoming Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {sessionRequests.length === 0 ? (
            <EmptyState
              title="No session requests received yet"
              description="When parents in Doha book your verified profile, their training goals and slot requests will appear here."
            />
          ) : (
            <div className="space-y-4">
              {sessionRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[var(--muted-color)] mb-1">
                        <span className="font-bold text-[var(--accent-text)]">
                          Parent: {req.parentName}
                        </span>
                        <span>·</span>
                        <span className="font-mono">Received {req.createdAt}</span>
                      </div>
                      <h3 className="font-heading text-lg text-[var(--heading-color)]">
                        Child: {req.childFirstName} ({req.childAge} years old) · {req.childLevel}
                      </h3>
                      <div className="text-xs text-[var(--muted-color)] flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Requested Slot: {req.slotDay} · {req.slotTime}</span>
                        <span>·</span>
                        <span>{req.slotLocation}</span>
                      </div>
                    </div>

                    <StatusChip status={req.status} size="md" />
                  </div>

                  {/* Goal and Message */}
                  <div className="p-3.5 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-2 text-xs">
                    <div>
                      <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">DEVELOPMENTAL GOAL</span>
                      <p className="font-semibold text-[var(--heading-color)] mt-0.5">{req.goal}</p>
                    </div>
                    {req.message && (
                      <div className="pt-2 border-t border-[var(--border-color)]">
                        <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">PARENT NOTE</span>
                        <p className="text-[var(--muted-color)] italic mt-0.5">"{req.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  {req.status === 'Pending' && (
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                      <button
                        type="button"
                        onClick={() => handleDecline(req.id)}
                        className="btn-action text-xs text-red-400 border-red-500/40 hover:bg-red-500/10 py-1.5 px-3"
                      >
                        DECLINE
                      </button>

                      <button
                        type="button"
                        onClick={() => setProposeModalRequestId(req.id)}
                        className="btn-action text-xs text-amber-500 border-amber-500/40 hover:bg-amber-500/10 py-1.5 px-3"
                      >
                        PROPOSE ANOTHER TIME
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAccept(req.id)}
                        className="btn-primary text-xs py-1.5 px-4 font-bold"
                      >
                        ACCEPT & CONFIRM SESSION
                      </button>
                    </div>
                  )}

                  {req.status === 'Accepted' && (
                    <div className="pt-2 border-t border-[var(--border-color)] text-xs text-emerald-500 flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        SESSION CONFIRMED IN CALENDAR
                      </span>
                      <span className="font-mono text-[11px] text-[var(--muted-color)]">
                        Parent notified
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Weekly Calendar */}
      {activeTab === 'calendar' && (
        <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Confirmed Weekly Coaching Schedule
            </h3>
            <span className="text-xs font-mono text-[var(--muted-color)]">
              {acceptedSessions.length} active sessions
            </span>
          </div>

          {acceptedSessions.length === 0 ? (
            <EmptyState
              title="No confirmed sessions in calendar"
              description="Accept pending requests from parents to populate your weekly schedule."
              actionLabel="VIEW PENDING REQUESTS"
              onAction={() => setActiveTab('requests')}
            />
          ) : (
            <div className="space-y-3">
              {acceptedSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border border-emerald-500/40 bg-[var(--inset-bg)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-emerald-500">{session.slotDay}</span>
                      <span className="font-mono text-[var(--heading-color)] font-bold">{session.slotTime}</span>
                    </div>
                    <div className="text-[var(--heading-color)] font-semibold">
                      Student: {session.childFirstName} ({session.childAge} yrs) · Parent: {session.parentName}
                    </div>
                    <div className="text-[11px] text-[var(--muted-color)]">{session.slotLocation}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusChip status="Accepted" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Availability Editor */}
      {activeTab === 'availability' && (
        <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
          <div className="border-b border-[var(--border-color)] pb-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)]">
              Manage Active Pitch Availability Slots
            </h3>
            <p className="text-xs text-[var(--muted-color)]">
              Click to toggle time slots available or closed for private parent discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sessionSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => toggleSlotAvailability(slot.id)}
                className={`p-4 border cursor-pointer transition-colors space-y-2 ${
                  slot.isAvailable
                    ? 'border-emerald-500/50 bg-[var(--inset-bg)]'
                    : 'border-dashed border-[var(--border-color)] opacity-60 bg-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--heading-color)]">{slot.day}</span>
                  <span className={`text-[10px] font-mono-label ${slot.isAvailable ? 'text-emerald-500' : 'text-[var(--muted-color)]'}`}>
                    {slot.isAvailable ? 'ACTIVE / OPEN' : 'CLOSED / UNAVAILABLE'}
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--accent-text)]">{slot.time}</div>
                <div className="text-[11px] text-[var(--muted-color)]">{slot.location}</div>
                <div className="pt-2 text-[10px] font-mono text-[var(--muted-color)] border-t border-[var(--border-color)]">
                  Click to {slot.isAvailable ? 'deactivate' : 'activate'} this slot
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Propose Another Time Modal */}
      {proposeModalRequestId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setProposeModalRequestId(null)}
        >
          <div
            className="w-full max-w-md bg-[var(--panel-bg)] border border-[var(--border-color)] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-base text-[var(--heading-color)]">
                Propose Alternative Session Slot
              </h3>
              <p className="text-xs text-[var(--muted-color)]">
                The parent will be prompted to accept or adjust to your recommended window.
              </p>
            </div>

            <form onSubmit={handleProposeTime} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  PROPOSED DATE & TIME WINDOW *
                </label>
                <input
                  type="text"
                  required
                  value={alternateTimeInput}
                  onChange={(e) => setAlternateTimeInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProposeModalRequestId(null)}
                  className="btn-action text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  TRANSMIT COUNTER-OFFER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
