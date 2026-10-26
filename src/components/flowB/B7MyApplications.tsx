import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { Stepper, StepItem } from '../shared/Stepper.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const B7MyApplications: React.FC = () => {
  const { applications, vacancies, setFlowStep, setSelectedVacancyId } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const statuses = ['All', 'Applied', 'Shortlisted', 'Interview requested', 'Offer'];

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Offer') return app.status.includes('Offer');
    return app.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW B</span>
            <span>/</span>
            <span>COACH PERSPECTIVE</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B7 MY APPLICATIONS</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Active Club Coaching Applications
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Real-time status tracking across youth academy recruitment pipelines in Qatar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowStep('B2')}
            className="btn-action text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXPLORE MORE VACANCIES (B2)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border border-[var(--border-color)] bg-[var(--inset-bg)] overflow-x-auto">
        {statuses.map((st) => {
          const count =
            st === 'All'
              ? applications.length
              : applications.filter((a) => (st === 'Offer' ? a.status.includes('Offer') : a.status === st)).length;

          return (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] whitespace-nowrap flex items-center gap-2 ${
                filterStatus === st
                  ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                  : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{st.toUpperCase()}</span>
              {st === 'Offer' && <StatusChip status="Planned" size="sm" className="text-[9px]" />}
              <span className="text-[10px] font-mono px-1.5 border border-[var(--border-color)]">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          title={`No applications under "${filterStatus}"`}
          description="Browse open vacancies to submit your verified profile to football academies."
          actionLabel="BROWSE VACANCIES"
          onAction={() => setFlowStep('B2')}
        />
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const vac = vacancies.find((v) => v.id === app.vacancyId) || vacancies[0];

            const applicationSteps: StepItem[] = [
              { id: '1', label: 'Applied', status: 'completed' },
              {
                id: '2',
                label: 'Shortlisted',
                status: app.status === 'Shortlisted' || app.status === 'Interview requested' ? 'completed' : 'upcoming'
              },
              {
                id: '3',
                label: 'Interview requested',
                status: app.status === 'Interview requested' ? 'active' : 'upcoming'
              },
              {
                id: '4',
                label: 'Offer',
                status: 'upcoming',
                isPlanned: true
              }
            ];

            return (
              <div
                key={app.id}
                className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-color)] mb-1">
                      <span className="font-bold text-[var(--accent-text)]">{vac.club}</span>
                      <span>·</span>
                      <span>{vac.location}</span>
                      <span>·</span>
                      <span className="font-mono">Submitted {app.appliedDate}</span>
                    </div>
                    <h3 className="font-heading text-lg text-[var(--heading-color)]">
                      {vac.title}
                    </h3>
                  </div>

                  <StatusChip status={app.status} size="md" />
                </div>

                {/* Stepper */}
                <Stepper steps={applicationSteps} />

                {/* Cover Note & Feedback */}
                <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs text-[var(--muted-color)] space-y-1">
                  <span className="font-mono-label block text-[10px] text-[var(--text-primary)]">
                    ATTACHED APPLICATION MEMO
                  </span>
                  <p className="italic">"{app.note}"</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-xs">
                  <span className="font-mono text-[var(--muted-color)]">
                    Target Start: {vac.startDate} · {vac.contractType}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedVacancyId(vac.id);
                      setFlowStep('B3');
                    }}
                    className="btn-action text-xs py-1 px-3"
                  >
                    VIEW VACANCY DETAILS
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
