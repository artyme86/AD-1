import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Check, Plus, Minus, ArrowRight, Eye, Send, Award, Calendar, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';

export const B5CandidateShortlist: React.FC = () => {
  const {
    coaches,
    shortlistedCoachIds,
    toggleShortlistCoach,
    comparedCoachIds,
    toggleCompareCoach,
    setSelectedCoachForView,
    setFlowStep,
    showToast
  } = useApp();

  const [filterSport, setFilterSport] = useState<string>('Football');
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filter coaches
  const matchingCoaches = coaches.filter(
    (c) => filterSport === 'All' || c.sport === filterSport
  );

  const comparedCoaches = coaches.filter((c) => comparedCoachIds.includes(c.id));

  const handleInspectProfile = (coachId: string) => {
    setSelectedCoachForView(coachId);
    setFlowStep('B6');
  };

  const handleInviteToApply = (coachName: string) => {
    showToast(`Invitation to apply sent directly to ${coachName}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>BUSINESS PORTAL</span>
            <span>/</span>
            <span>HIRE A COACH</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B5 SHORTLIST</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Verified Youth Coach Candidate Shortlist
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Pre-audited coaching candidates in Qatar matching U10–U12 football development criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowStep('B4')}
            className="btn-action text-xs"
          >
            + POST NEW VACANCY (B4)
          </button>
        </div>
      </div>

      {/* Comparison Drawer Indicator if any coaches selected */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-[var(--accent-red)] shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-[var(--heading-color)]">
              Candidate Comparison Matrix: {comparedCoachIds.length} / 3 Selected
            </span>
            <span className="block text-[11px] text-[var(--muted-color)]">
              Select up to 3 candidates to inspect license depth, tactical timeline, and rates side-by-side.
            </span>
          </div>
        </div>

        {comparedCoachIds.length > 0 && (
          <button
            type="button"
            onClick={() => setShowComparisonModal(true)}
            className="btn-primary text-xs py-2 px-4 gap-1.5"
          >
            <span>COMPARE ({comparedCoachIds.length}) COACHES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matchingCoaches.map((coach) => {
          const isShortlisted = shortlistedCoachIds.includes(coach.id);
          const isCompared = comparedCoachIds.includes(coach.id);

          return (
            <div
              key={coach.id}
              className={`p-5 border bg-[var(--panel-bg)] flex flex-col justify-between space-y-4 transition-colors ${
                isShortlisted
                  ? 'border-purple-500/60 ring-1 ring-purple-500/30'
                  : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div className="space-y-3">
                {/* Header row with Avatar & Verified */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-[var(--inset-bg)] border border-[var(--border-color)] overflow-hidden shrink-0 relative">
                      {coach.avatarUrl ? (
                        <img
                          src={coach.avatarUrl}
                          alt={coach.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-heading text-base font-bold text-[var(--accent-text)]">
                          {coach.name.split(' ')[1]?.slice(0, 2).toUpperCase() || 'CO'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-[var(--heading-color)] font-bold">
                        {coach.name}
                      </h3>
                      <div className="text-xs text-[var(--muted-color)]">
                        {coach.location}
                      </div>
                    </div>
                  </div>

                  {coach.verified ? (
                    <VerifiedBadge
                      name={coach.name}
                      details={coach.verificationDetails}
                    />
                  ) : (
                    <StatusChip status="Pending" />
                  )}
                </div>

                {/* Headline */}
                <p className="text-xs text-[var(--text-primary)] font-medium">
                  {coach.headline}
                </p>

                {/* Criteria Match Chips */}
                <div className="p-2.5 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">
                    CRITERIA MATCH
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                      <Check className="w-3 h-3 stroke-[3]" /> License ({coach.licenses[0]?.title.split('/')[0]})
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                      <Check className="w-3 h-3 stroke-[3]" /> Ages 7–12
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                      <Check className="w-3 h-3 stroke-[3]" /> Doha
                    </span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Primary License</span>
                    <span className="font-bold text-[var(--heading-color)]">{coach.licenses[0]?.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Experience</span>
                    <span className="font-mono text-[var(--heading-color)]">{coach.experience[0]?.period}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Target Ages</span>
                    <span className="text-[var(--heading-color)] font-mono">{coach.ageGroups.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Languages</span>
                    <span className="text-[var(--heading-color)]">{coach.languages.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Availability</span>
                    <span className="text-[var(--heading-color)] font-mono text-[11px]">{coach.availability}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-[var(--border-color)]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleShortlistCoach(coach.id)}
                    className={`btn-action text-xs justify-center ${
                      isShortlisted ? 'border-purple-500 text-purple-400 bg-purple-500/10' : ''
                    }`}
                  >
                    {isShortlisted ? 'SHORTLISTED ✓' : '+ SHORTLIST'}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompareCoach(coach.id)}
                    className={`btn-action text-xs justify-center ${
                      isCompared ? 'border-[var(--accent-red)] text-[var(--accent-text)] bg-[var(--inset-bg)]' : ''
                    }`}
                  >
                    {isCompared ? 'COMPARING ✓' : 'COMPARE'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleInviteToApply(coach.name)}
                    className="btn-action text-xs justify-center text-emerald-500 border-emerald-500/40 hover:bg-emerald-500/10"
                  >
                    INVITE TO APPLY
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInspectProfile(coach.id)}
                    className="btn-primary text-xs justify-center gap-1"
                  >
                    <span>FULL DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Modal / Popover */}
      {showComparisonModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShowComparisonModal(false)}
        >
          <div
            className="w-full max-w-5xl bg-[var(--panel-bg)] border border-[var(--border-color)] p-6 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <span className="text-[10px] font-mono-label text-[var(--accent-text)]">
                  CANDIDATE COMPARISON MATRIX
                </span>
                <h3 className="font-heading text-lg text-[var(--heading-color)]">
                  Side-by-Side Credentials & Compliance Breakdown
                </h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="btn-action text-xs"
              >
                CLOSE MATRIX
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparedCoaches.map((c) => (
                <div key={c.id} className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading text-sm text-[var(--heading-color)]">{c.name}</h4>
                    {c.verified ? (
                      <VerifiedBadge name={c.name} details={c.verificationDetails} />
                    ) : (
                      <StatusChip status="Pending" />
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">COACHING LICENSE</span>
                      <span className="font-bold text-[var(--heading-color)]">{c.licenses[0]?.title}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">SAFEGUARDING</span>
                      <span className="text-emerald-500 font-bold">{c.licenses[2]?.title || 'Child Safeguarding Active'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">LATEST EXPERIENCE</span>
                      <span className="text-[var(--text-primary)]">{c.experience[0]?.role} @ {c.experience[0]?.organization}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">AVAILABILITY</span>
                      <span className="font-mono text-[11px] text-[var(--text-primary)]">{c.availability}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">LANGUAGES</span>
                      <span className="text-[var(--text-primary)]">{c.languages.join(', ')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowComparisonModal(false);
                      handleInspectProfile(c.id);
                    }}
                    className="btn-primary w-full text-xs justify-center mt-3"
                  >
                    INSPECT PROFILE (B6)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
