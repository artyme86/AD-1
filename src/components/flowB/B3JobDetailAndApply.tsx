import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const B3JobDetailAndApply: React.FC = () => {
  const {
    vacancies,
    selectedVacancyId,
    applyToVacancy,
    setFlowStep,
    applications,
    coaches
  } = useApp();

  const activeVacancy =
    vacancies.find((v) => v.id === selectedVacancyId) || vacancies[0];
  const coach = coaches[0];

  const existingApp = applications.find(
    (a) => a.vacancyId === activeVacancy.id && a.coachId === coach.id
  );

  const [applicationNote, setApplicationNote] = useState(
    'I hold an active AFC/QFA "B" license (as recognised by the hiring club) and have spent the last 5 years coaching ages 8-12 at Falcon Rovers Youth Academy (Sample). I would welcome the opportunity to discuss this post.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      applyToVacancy(activeVacancy.id, coach.id, applicationNote);
      setIsSubmitting(false);
      setFlowStep('B7');
    }, 550);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>INDIVIDUAL PORTAL</span>
            <span>/</span>
            <span>OPPORTUNITIES</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B3 JOB DETAIL & APPLY</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            {activeVacancy.title}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            {activeVacancy.club} · {activeVacancy.location} · {activeVacancy.contractType}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {existingApp ? (
            <StatusChip status="Application Submitted" />
          ) : (
            <StatusChip status="Open Vacancy" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Job Details (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Summary Strip */}
          <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">AGE GROUP</span>
              <span className="font-bold text-[var(--heading-color)]">{activeVacancy.ageGroup}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">START DATE</span>
              <span className="font-mono text-[var(--heading-color)]">{activeVacancy.startDate}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">MIN LICENSE</span>
              <span className="font-bold text-emerald-500">{activeVacancy.minLicense}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">COMPENSATION</span>
              <span className="font-mono text-[var(--heading-color)]">{activeVacancy.salarySample}</span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[var(--accent-red)]" />
              Core Role Responsibilities
            </h3>
            <ul className="text-xs text-[var(--muted-color)] space-y-2 list-disc list-inside leading-relaxed">
              {activeVacancy.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Mandatory Coaching Qualifications & Experience (as recognised by the hiring club)
            </h3>
            <ul className="text-xs text-[var(--muted-color)] space-y-2 list-disc list-inside leading-relaxed">
              {activeVacancy.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Club Offering / Benefits */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
            <h3 className="font-heading text-sm text-[var(--heading-color)]">
              Club Package & Benefits
            </h3>
            <p className="text-xs text-[var(--muted-color)] leading-relaxed">
              {activeVacancy.benefits}
            </p>
          </div>
        </div>

        {/* Application Form Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 sticky top-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono-label text-[var(--muted-color)]">
                APPLY FOR THIS VACANCY
              </span>
              <h3 className="font-heading text-base text-[var(--heading-color)] mt-1">
                Direct Submission
              </h3>
            </div>

            {existingApp ? (
              <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPLICATION ACTIVE</span>
                </div>
                <p className="text-[11px] text-[var(--text-primary)]">
                  You applied on {existingApp.appliedDate}. Status is currently: <strong className="text-emerald-500">{existingApp.status}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setFlowStep('B7')}
                  className="btn-action w-full text-xs mt-2"
                >
                  VIEW APPLICATION STATUS (B7)
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs space-y-1">
                  <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">ATTACHED PROFILE</span>
                  <div className="font-bold text-[var(--heading-color)]">{coach.name}</div>
                  <div className="text-[11px] text-[var(--muted-color)]">
                    AFC B License · First Aid · Certified Specialist
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                    COVER NOTE TO ACADEMY DIRECTOR
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applicationNote}
                    onChange={(e) => setApplicationNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-xs justify-center gap-2 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                      <span>SUBMITTING DOSSIER...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>APPLY WITH MY PROFILE</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[var(--muted-color)]">
                  Transmits full verified license portfolio and background audit directly to the club hiring panel.
                </p>
              </form>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setFlowStep('B2')}
                className="btn-action w-full text-xs gap-1.5 justify-center"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO OPPORTUNITIES</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
