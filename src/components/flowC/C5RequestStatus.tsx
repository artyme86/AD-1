import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, XCircle, AlertCircle, MapPin, User, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const C5RequestStatus: React.FC = () => {
  const {
    sessionRequests,
    coaches,
    setFlowStep,
    updateSessionRequestStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'Accepted' | 'Pending'>('all');

  const filteredRequests = sessionRequests.filter((r) => {
    if (activeTab === 'all') return true;
    return r.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW C</span>
            <span>/</span>
            <span>PARENT PERSPECTIVE</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">C5 REQUEST STATUS & UPCOMING SESSIONS</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            My Session Requests & Confirmed Bookings
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Real-time status updates reflecting private coach confirmations and schedule slots in Qatar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowStep('C1')}
            className="btn-action text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>SEARCH MORE COACHES (C1)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border border-[var(--border-color)] bg-[var(--inset-bg)]">
        {(['all', 'Accepted', 'Pending'] as ('all' | 'Accepted' | 'Pending')[]).map((tab) => {
          const count =
            tab === 'all'
              ? sessionRequests.length
              : sessionRequests.filter((r) => r.status === tab).length;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                  : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{tab === 'all' ? 'ALL REQUESTS' : tab.toUpperCase()}</span>
              <span className="text-[10px] font-mono px-1.5 border border-[var(--border-color)]">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title={`No session requests under "${activeTab}"`}
          description="Book a slot with an accredited coach to start structured private training."
          actionLabel="FIND A COACH (C1)"
          onAction={() => setFlowStep('C1')}
        />
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const coach =
              coaches.find((c) => c.id === req.coachId) || coaches[0];

            return (
              <div
                key={req.id}
                className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-color)] mb-1">
                      <span className="font-bold text-[var(--accent-text)]">{coach.name}</span>
                      <span>·</span>
                      <span>{coach.sport}</span>
                      <span>·</span>
                      <span className="font-mono">Requested {req.createdAt}</span>
                    </div>
                    <h3 className="font-heading text-lg text-[var(--heading-color)]">
                      {req.slotDay} · {req.slotTime}
                    </h3>
                    <div className="text-xs text-[var(--muted-color)] flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                      <span>{req.slotLocation}</span>
                    </div>
                  </div>

                  <StatusChip status={req.status} size="md" />
                </div>

                {/* Details Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs">
                  <div>
                    <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">CHILD & LEVEL</span>
                    <span className="font-bold text-[var(--heading-color)]">
                      {req.childFirstName} ({req.childAge} yrs) · {req.childLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">COACHING GOAL</span>
                    <span className="text-[var(--text-primary)] truncate block">{req.goal}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">SESSION RATE</span>
                    <span className="font-mono text-emerald-500 font-bold">QAR {coach.pricePerSessionQar} (Sample)</span>
                  </div>
                </div>

                {/* Proposed New Time Notice if coach suggested alternate slot */}
                {req.status === 'New time proposed' && req.proposedNewTime && (
                  <div className="p-3 border border-amber-500/40 bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="font-bold text-[var(--heading-color)]">Coach proposed alternative slot: </span>
                        <strong className="text-amber-400 font-mono">{req.proposedNewTime}</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSessionRequestStatus(req.id, 'Accepted')}
                      className="btn-primary py-1.5 px-3 text-xs"
                    >
                      ACCEPT THIS PROPOSED TIME
                    </button>
                  </div>
                )}

                {/* Status Notice */}
                {req.status === 'Accepted' && (
                  <div className="p-3 border border-emerald-500/40 bg-emerald-500/10 text-xs text-[var(--text-primary)] flex items-center justify-between">
                    <span className="flex items-center gap-2 text-emerald-500 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      SESSION CONFIRMED · Direct coach messaging & calendar sync unlocked.
                    </span>
                    <span className="font-mono text-[11px] text-[var(--muted-color)]">
                      Booking Ref: QA-{req.id.slice(-6)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
