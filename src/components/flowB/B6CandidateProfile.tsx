import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Calendar, Award, Briefcase, ShieldCheck, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';
import { Stepper, StepItem } from '../shared/Stepper.tsx';

export const B6CandidateProfile: React.FC = () => {
  const {
    coaches,
    selectedCoachForView,
    requestInterview,
    setFlowStep,
    applications,
    vacancies,
    showToast
  } = useApp();

  const coach =
    coaches.find((c) => c.id === selectedCoachForView) || coaches[0];
  const vacancy = vacancies[0];

  const application = applications.find(
    (a) => a.coachId === coach.id && a.vacancyId === vacancy.id
  );

  const isInterviewRequested = application?.status === 'Interview requested';

  const [showMessageInfo, setShowMessageInfo] = useState(false);
  const [isRequestingInterview, setIsRequestingInterview] = useState(false);

  const handleRequestInterview = () => {
    setIsRequestingInterview(true);
    setTimeout(() => {
      requestInterview(vacancy.id, coach.id);
      setIsRequestingInterview(false);
    }, 500);
  };

  const steps: StepItem[] = [
    {
      id: 'step-1',
      label: 'Shortlisted',
      status: 'completed'
    },
    {
      id: 'step-2',
      label: 'Interview',
      status: isInterviewRequested ? 'active' : 'upcoming'
    },
    {
      id: 'step-3',
      label: 'Offer',
      status: 'upcoming',
      isPlanned: true
    },
    {
      id: 'step-4',
      label: 'Agreement',
      status: 'upcoming',
      isPlanned: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW B</span>
            <span>/</span>
            <span>CLUB CLIENT PERSPECTIVE</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B6 CANDIDATE PROFILE & INTERVIEW</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Candidate Dossier: {coach.name}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Full compliance audit, federation licenses, and youth coaching record.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VerifiedBadge name={coach.name} details={coach.verificationDetails} />
        </div>
      </div>

      {/* Recruitment Stepper */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-label text-[var(--muted-color)]">
            RECRUITMENT PIPELINE STATUS
          </span>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            TARGET: {vacancy.title} ({vacancy.club})
          </span>
        </div>
        <Stepper steps={steps} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Core Identity & Safeguarding (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="aspect-square bg-[var(--inset-bg)] border border-[var(--border-color)] flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-20 h-20 bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center font-heading text-2xl font-bold text-[var(--accent-text)]">
                {coach.name.split(' ')[1]?.slice(0, 2).toUpperCase() || 'CO'}
              </div>
              <span className="text-xs font-mono text-emerald-500 font-bold">
                ✓ IDENTITY & SAFEGUARDING VERIFIED
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading text-lg text-[var(--heading-color)]">
                {coach.name}
              </h2>
              <p className="text-xs text-[var(--accent-text)]">{coach.headline}</p>
              <div className="text-xs text-[var(--muted-color)]">{coach.location}</div>
            </div>

            <div className="space-y-2 text-xs border-t border-[var(--border-color)] pt-3">
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Target Ages</span>
                <span className="font-mono text-[var(--heading-color)]">Ages {coach.ageGroups.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Languages</span>
                <span className="text-[var(--heading-color)]">{coach.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Availability</span>
                <span className="font-mono text-[11px] text-[var(--heading-color)]">{coach.availability}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
              {isInterviewRequested ? (
                <div className="p-3 text-center text-xs font-mono-label text-emerald-500 border border-emerald-500/40 bg-emerald-500/10 font-bold">
                  ✓ INTERVIEW REQUEST LOGGED
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestInterview}
                  disabled={isRequestingInterview}
                  className="btn-primary w-full text-xs justify-center gap-1.5 py-3"
                >
                  {isRequestingInterview ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                      <span>TRANSMITTING INVITATION...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>REQUEST INTERVIEW</span>
                    </>
                  )}
                </button>
              )}

              {/* Message button with mutual connection constraint rule */}
              <button
                type="button"
                onClick={() => setShowMessageInfo(!showMessageInfo)}
                className="btn-action w-full text-xs justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>MESSAGE CANDIDATE</span>
              </button>

              {showMessageInfo && (
                <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs text-[var(--muted-color)] space-y-1">
                  <div className="flex items-center gap-1 text-[var(--accent-text)] font-mono-label text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>MUTUAL CONNECTION PROTOCOL</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Direct in-app messaging unlocks once the coach accepts your interview invitation or an application connection is confirmed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Verified Licenses, Experience & Background (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Coaching Philosophy */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
            <h3 className="font-heading text-sm text-[var(--heading-color)]">
              Development Philosophy & Methodology
            </h3>
            <p className="text-xs text-[var(--muted-color)] leading-relaxed">
              {coach.bio}
            </p>
          </div>

          {/* Licenses */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Verified Federation Licenses & Background Check
            </h3>
            <div className="space-y-2">
              {coach.licenses.map((lic, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">{lic.title}</div>
                    <div className="text-[11px] text-[var(--muted-color)]">
                      {lic.issuer} · Class of {lic.year}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono-label border border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                    {lic.status === 'Verified' ? '✓ VERIFIED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[var(--accent-red)]" />
              Documented Academy Career
            </h3>
            <div className="space-y-3">
              {coach.experience.map((exp, idx) => (
                <div key={idx} className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[var(--heading-color)]">{exp.role}</span>
                    <span className="font-mono text-[11px] text-[var(--muted-color)]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[var(--accent-text)]">{exp.organization}</div>
                  <p className="text-xs text-[var(--muted-color)] leading-relaxed pt-0.5">
                    {exp.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Back */}
          <div className="flex justify-start">
            <button
              onClick={() => setFlowStep('B5')}
              className="btn-action text-xs gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO CANDIDATE SHORTLIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
