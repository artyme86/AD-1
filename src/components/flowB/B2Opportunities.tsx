import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, Check, Filter, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const B2Opportunities: React.FC = () => {
  const { vacancies, setSelectedVacancyId, setFlowStep, applications } = useApp();

  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [selectedContract, setSelectedContract] = useState<string>('All');

  const filteredVacancies = vacancies.filter((v) => {
    if (selectedSport !== 'All' && v.sport !== selectedSport) return false;
    if (selectedAge !== 'All' && !v.ageGroup.includes(selectedAge)) return false;
    if (selectedContract !== 'All' && v.contractType !== selectedContract) return false;
    return true;
  });

  const handleSelectJob = (vacancyId: string) => {
    setSelectedVacancyId(vacancyId);
    setFlowStep('B3');
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
            <span className="text-[var(--accent-text)]">B2 VACANCIES</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Accredited Club Coaching Vacancies
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Verified opportunities from accredited clubs and youth football development academies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowStep('B7')}
            className="btn-action text-xs py-2 px-3 gap-1.5"
          >
            <span>MY APPLICATIONS ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
        <div className="text-xs font-mono-label text-[var(--muted-color)] flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[var(--accent-red)]" />
          <span>CRITERIA-BASED OPPORTUNITY FILTERS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Sport Filter */}
          <div>
            <label className="block text-[10px] font-mono-label text-[var(--muted-color)] mb-1">
              SPORT
            </label>
            <div className="flex gap-1">
              {['All', 'Football', 'Swimming', 'Tennis'].map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSelectedSport(sport)}
                  className={`btn-action text-xs py-1 px-2.5 flex-1 justify-center ${
                    selectedSport === sport
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--muted-color)]'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Filter */}
          <div>
            <label className="block text-[10px] font-mono-label text-[var(--muted-color)] mb-1">
              AGE GROUP
            </label>
            <div className="flex gap-1">
              {['All', '7–9', '10–12'].map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setSelectedAge(age)}
                  className={`btn-action text-xs py-1 px-2.5 flex-1 justify-center ${
                    selectedAge === age
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--muted-color)]'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Contract Type Filter */}
          <div>
            <label className="block text-[10px] font-mono-label text-[var(--muted-color)] mb-1">
              CONTRACT
            </label>
            <div className="flex gap-1">
              {['All', 'Full-time', 'Part-time'].map((contract) => (
                <button
                  key={contract}
                  type="button"
                  onClick={() => setSelectedContract(contract)}
                  className={`btn-action text-xs py-1 px-2.5 flex-1 justify-center ${
                    selectedContract === contract
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--muted-color)]'
                  }`}
                >
                  {contract}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vacancy Cards List */}
      {filteredVacancies.length === 0 ? (
        <EmptyState
          title="No vacancies match these criteria"
          description="Adjust your sport, age group or contract filters to view more club opportunities."
          actionLabel="RESET FILTERS"
          onAction={() => {
            setSelectedSport('All');
            setSelectedAge('All');
            setSelectedContract('All');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredVacancies.map((vac) => {
            const hasApplied = applications.some((a) => a.vacancyId === vac.id);

            return (
              <div
                key={vac.id}
                onClick={() => handleSelectJob(vac.id)}
                className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)] transition-colors cursor-pointer space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {vac.bannerUrl && (
                      <div className="w-24 h-20 border border-[var(--border-color)] overflow-hidden shrink-0 hidden sm:block relative">
                        <img
                          src={vac.bannerUrl}
                          alt={vac.club}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[var(--accent-text)]">
                          {vac.club}
                        </span>
                        <span className="text-[var(--border-color)]">·</span>
                        <span className="text-[11px] font-mono text-[var(--muted-color)]">
                          {vac.location}
                        </span>
                        <span className="text-[var(--border-color)]">·</span>
                        <span className="text-[11px] font-mono text-[var(--muted-color)]">
                          Published {vac.publishedDate}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg text-[var(--heading-color)] font-bold">
                        {vac.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hasApplied ? (
                      <span className="px-2 py-0.5 text-xs font-mono-label border border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                        APPLIED ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs font-mono-label border border-[var(--border-color)] text-[var(--text-primary)]">
                        {vac.contractType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Criteria Match Chip Row */}
                <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                      CRITERIA ALIGNMENT:
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-500 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> License ({vac.minLicense})
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-500 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Ages ({vac.ageGroup})
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-500 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Location (Doha)
                    </span>
                  </div>

                  <div className="font-mono text-xs text-[var(--heading-color)]">
                    {vac.salarySample}
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-xs text-[var(--muted-color)]">
                  <span>Start date: {vac.startDate} · Requires {vac.minExperienceYears}+ yrs experience</span>
                  <span className="text-[var(--accent-text)] font-mono-label flex items-center gap-1">
                    VIEW SPECIFICATION & APPLY <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
