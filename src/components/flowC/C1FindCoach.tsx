import React from 'react';
import { Search, MapPin, Calendar, User, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const C1FindCoach: React.FC = () => {
  const { parentSearch, setParentSearch, setFlowStep } = useApp();

  const sports = ['Football', 'Swimming', 'Tennis', 'Athletics'];
  const locations = [
    'Doha Central, Qatar',
    'The Pearl & West Bay',
    'Lusail Marina',
    'Aspire Zone & Al Rayyan'
  ];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const formats = ['In person', 'Online / Hybrid'];
  const days = ['All', 'Tuesday', 'Thursday', 'Saturday'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowStep('C2');
  };

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
            <span className="text-[var(--accent-text)]">C1 FIND A COACH</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Verified Private Coach Finder
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Discover independently verified, child-safeguarded private sports instructors for youth aged 7 to 12.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Client View" />
          <button
            onClick={() => setFlowStep('C5')}
            className="btn-action text-xs"
          >
            MY BOOKINGS (C5)
          </button>
        </div>
      </div>

      {/* Safeguarding Assurance Strip */}
      <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-[var(--heading-color)]">
              Parent Safeguarding Guarantee
            </span>
            <span className="block text-[11px] text-[var(--muted-color)]">
              100% of listed coaches hold Qatar MOI criminal background clearance and accredited child protection certifications.
            </span>
          </div>
        </div>
        <StatusChip status="Active Audit" size="sm" />
      </div>

      {/* Search Form Card */}
      <div className="max-w-3xl mx-auto p-6 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-6">
        <form onSubmit={handleSearch} className="space-y-5">
          {/* Sport Selection */}
          <div>
            <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              01. SELECT SPORT *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setParentSearch((prev) => ({ ...prev, sport }))}
                  className={`btn-action text-xs justify-center py-2.5 ${
                    parentSearch.sport === sport
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Child's Age and Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                CHILD'S AGE (AGES 7 – 12) *
              </label>
              <div className="flex items-center border border-[var(--border-color)] bg-[var(--inset-bg)]">
                <button
                  type="button"
                  onClick={() => setParentSearch((prev) => ({ ...prev, childAge: Math.max(7, prev.childAge - 1) }))}
                  className="w-10 h-10 flex items-center justify-center font-mono text-base hover:bg-[var(--panel-bg)]"
                  aria-label="Decrease age"
                >
                  -
                </button>
                <div className="flex-1 text-center font-mono font-bold text-sm text-[var(--heading-color)]">
                  {parentSearch.childAge} Years Old
                </div>
                <button
                  type="button"
                  onClick={() => setParentSearch((prev) => ({ ...prev, childAge: Math.min(12, prev.childAge + 1) }))}
                  className="w-10 h-10 flex items-center justify-center font-mono text-base hover:bg-[var(--panel-bg)]"
                  aria-label="Increase age"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                EXPERIENCE LEVEL *
              </label>
              <select
                value={parentSearch.childLevel}
                onChange={(e) => setParentSearch((prev) => ({ ...prev, childLevel: e.target.value }))}
                className="w-full px-3 py-2.5 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                PREFERRED LOCATION IN DOHA *
              </label>
              <select
                value={parentSearch.location}
                onChange={(e) => setParentSearch((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2.5 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                SESSION FORMAT *
              </label>
              <select
                value={parentSearch.sessionFormat}
                onChange={(e) => setParentSearch((prev) => ({ ...prev, sessionFormat: e.target.value }))}
                className="w-full px-3 py-2.5 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
              >
                {formats.map((fmt) => (
                  <option key={fmt} value={fmt}>{fmt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Available Days */}
          <div>
            <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              AVAILABLE DAYS
            </label>
            <div className="flex gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setParentSearch((prev) => ({ ...prev, availableDay: day }))}
                  className={`btn-action text-xs flex-1 justify-center py-2 ${
                    parentSearch.availableDay === day
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--muted-color)]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-3 border-t border-[var(--border-color)]">
            <button
              type="submit"
              className="btn-primary w-full text-xs justify-center gap-2 py-3.5 font-bold"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH ACCREDITED COACHES</span>
            </button>
            <p className="text-[10px] text-center text-[var(--muted-color)] mt-2">
              Matches strictly on accredited licenses, active police clearances, and location proximity.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
