import React from 'react';
import { ArrowLeft, ShieldCheck, Award, Briefcase, Calendar, MapPin, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const C3CoachProfile: React.FC = () => {
  const {
    coaches,
    selectedCoachForView,
    sessionSlots,
    setFlowStep
  } = useApp();

  const coach =
    coaches.find((c) => c.id === selectedCoachForView) || coaches[0];

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
            <span className="text-[var(--accent-text)]">C3 COACH PROFILE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            {coach.name}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            {coach.headline} · {coach.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VerifiedBadge name={coach.name} details={coach.verificationDetails} />
          <button
            onClick={() => setFlowStep('C4')}
            className="btn-primary text-xs py-2 px-4 gap-1.5"
          >
            <span>REQUEST A SESSION (C4)</span>
          </button>
        </div>
      </div>

      {/* Mandatory Safeguarding Note */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs">
          <div className="font-bold text-[var(--heading-color)]">
            Safeguarding & Verified Privacy Architecture
          </div>
          <p className="text-[var(--muted-color)] leading-relaxed">
            Only verified items are shown. Contact details are shared after the coach accepts. Direct private messaging and location directions open automatically once a mutual session request is confirmed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Identity, Rates & Formats (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="aspect-square bg-[var(--inset-bg)] border border-[var(--border-color)] flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-20 h-20 bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center font-heading text-2xl font-bold text-[var(--accent-text)]">
                {coach.name.split(' ')[1]?.slice(0, 2).toUpperCase() || 'CO'}
              </div>
              <span className="text-xs font-mono text-emerald-500 font-bold">
                ✓ BACKGROUND AUDIT ACTIVE
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading text-lg text-[var(--heading-color)]">
                {coach.name}
              </h2>
              <p className="text-xs text-[var(--accent-text)]">{coach.headline}</p>
              <div className="text-xs text-[var(--muted-color)] flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)] shrink-0" />
                <span>{coach.location}</span>
              </div>
            </div>

            {/* Rates & Session Formats */}
            <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">1-on-1 Private:</span>
                <span className="font-mono font-bold text-emerald-500">QAR {coach.pricePerSessionQar} / hr (Sample)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Session Formats:</span>
                <span className="text-[var(--heading-color)]">{coach.sessionFormats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Target Bracket:</span>
                <span className="text-[var(--heading-color)] font-mono">Ages {coach.ageGroups.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Languages:</span>
                <span className="text-[var(--heading-color)]">{coach.languages.join(', ')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFlowStep('C4')}
              className="btn-primary w-full text-xs justify-center py-3"
            >
              BOOK PRIVATE SESSION WITH COACH
            </button>
          </div>
        </div>

        {/* Right Column: Credentials, Experience, Slots & Empty Reviews (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Bio */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
            <h3 className="font-heading text-sm text-[var(--heading-color)]">
              Coaching Approach & Philosophy
            </h3>
            <p className="text-xs text-[var(--muted-color)] leading-relaxed">
              {coach.bio}
            </p>
          </div>

          {/* Credentials with Verification Status */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Verified Credentials & Accreditations
            </h3>
            <div className="space-y-2">
              {coach.licenses.map((lic, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-[var(--heading-color)]">{lic.title}</span>
                    <span className="block text-[11px] text-[var(--muted-color)]">
                      Issued by {lic.issuer} · Class of {lic.year}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono-label border border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                    {lic.status === 'Verified' ? '✓ VERIFIED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[var(--accent-red)]" />
              Coaching Background
            </h3>
            <div className="space-y-3">
              {coach.experience.map((exp, idx) => (
                <div key={idx} className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--heading-color)]">{exp.role}</span>
                    <span className="font-mono text-[11px] text-[var(--muted-color)]">{exp.period}</span>
                  </div>
                  <div className="text-[var(--accent-text)]">{exp.organization}</div>
                  <p className="text-[var(--muted-color)] leading-relaxed pt-0.5">
                    {exp.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Availability Grid */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                Weekly Availability Grid
              </h3>
              <span className="text-[11px] font-mono text-[var(--muted-color)]">
                Select a slot in C4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sessionSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 border text-xs space-y-1 ${
                    slot.isAvailable
                      ? 'border-[var(--border-color)] bg-[var(--inset-bg)]'
                      : 'border-dashed border-[var(--border-color)] opacity-50 bg-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--heading-color)]">{slot.day}</span>
                    <span className={`text-[10px] font-mono-label ${slot.isAvailable ? 'text-emerald-500' : 'text-[var(--muted-color)]'}`}>
                      {slot.isAvailable ? 'OPEN SLOT' : 'BOOKED'}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[var(--accent-text)]">{slot.time}</div>
                  <div className="text-[11px] text-[var(--muted-color)] truncate">{slot.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty Review State */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--muted-color)]" />
              Verified Parent Reviews
            </h3>
            <EmptyState
              title="No reviews yet"
              description="Reviews appear after completed sessions. Only verified parents who attended a logged session can post an evaluation."
              icon="message"
            />
          </div>

          {/* Back button */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setFlowStep('C2')}
              className="btn-action text-xs gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO RESULTS</span>
            </button>

            <button
              onClick={() => setFlowStep('C4')}
              className="btn-primary text-xs py-2 px-5"
            >
              REQUEST A SESSION (C4)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
