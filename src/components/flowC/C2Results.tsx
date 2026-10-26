import React, { useState } from 'react';
import { ArrowLeft, Filter, ShieldCheck, MapPin, Calendar, ArrowRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';

export const C2Results: React.FC = () => {
  const {
    coaches,
    parentSearch,
    setSelectedCoachForView,
    setFlowStep
  } = useApp();

  const [sortBy, setSortBy] = useState<'verifications' | 'priceAsc'>('verifications');
  const [selectedSportFilter, setSelectedSportFilter] = useState<string>(parentSearch.sport);

  const filteredCoaches = coaches.filter((c) => {
    if (selectedSportFilter !== 'All' && c.sport !== selectedSportFilter) return false;
    return true;
  });

  const sortedCoaches = [...filteredCoaches].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.pricePerSessionQar - b.pricePerSessionQar;
    return b.profileCompleteness - a.profileCompleteness;
  });

  const handleSelectCoach = (coachId: string) => {
    setSelectedCoachForView(coachId);
    setFlowStep('C3');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>ATHLETE & PARENT PORTAL</span>
            <span>/</span>
            <span>FIND A COACH</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">C2 RESULTS</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Verified Coaches Available for {parentSearch.sport}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Showing verified results matching ages {parentSearch.childAge} in {parentSearch.location}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowStep('C1')}
            className="btn-action text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>MODIFY SEARCH (C1)</span>
          </button>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-3 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">SPORT:</span>
          {['All', 'Football', 'Swimming', 'Tennis'].map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSelectedSportFilter(sp)}
              className={`btn-action text-xs py-1 px-2.5 ${
                selectedSportFilter === sp
                  ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                  : 'text-[var(--muted-color)]'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">SORT:</span>
          <button
            type="button"
            onClick={() => setSortBy('verifications')}
            className={`btn-action text-xs py-1 px-2.5 ${
              sortBy === 'verifications'
                ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                : 'text-[var(--muted-color)]'
            }`}
          >
            HIGHEST AUDIT SCORE
          </button>
          <button
            type="button"
            onClick={() => setSortBy('priceAsc')}
            className={`btn-action text-xs py-1 px-2.5 ${
              sortBy === 'priceAsc'
                ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                : 'text-[var(--muted-color)]'
            }`}
          >
            PRICE: LOW TO HIGH
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedCoaches.map((coach) => (
          <div
            key={coach.id}
            onClick={() => handleSelectCoach(coach.id)}
            className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)] transition-colors cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Top row */}
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
                      {coach.sport} · Ages {coach.ageGroups.join(', ')}
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
              <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
                {coach.headline}
              </p>

              {/* Location & Format */}
              <div className="space-y-1 text-xs text-[var(--muted-color)]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)] shrink-0" />
                  <span>{coach.location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{coach.availability}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-2.5 bg-[var(--inset-bg)] border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-label text-[var(--muted-color)] block">INDIVIDUAL SESSION</span>
                  <span className="text-xs text-[var(--muted-color)]">60 Minutes</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-emerald-500 tabular-nums">
                    from QAR {coach.pricePerSessionQar}
                  </span>
                  <span className="block text-[9px] font-mono text-[var(--muted-color)]">(Sample rate)</span>
                </div>
              </div>
            </div>

            {/* View Profile Action */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--muted-color)] font-mono">
                {coach.licenses[0]?.title.split(' ')[0]} Verified
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCoach(coach.id);
                }}
                className="btn-primary py-2 px-3 text-xs gap-1"
              >
                <span>VIEW PROFILE & BOOK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
