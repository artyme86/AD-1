import React from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    portal,
    setPortal,
    mode,
    setMode,
    role,
    flowStep,
    setFlowStep
  } = useApp();

  // Navigation handlers per portal
  const isFacilityActive = ['A1', 'A2', 'A3', 'A6'].includes(flowStep);
  const isHireCoachActive = ['B4', 'B5', 'B6'].includes(flowStep);
  const isRequestsActive = ['A4', 'A5'].includes(flowStep);
  const isProfileActive = flowStep === 'B1';
  const isOpportunitiesActive = ['B2', 'B3'].includes(flowStep);
  const isApplicationsActive = flowStep === 'B7';
  const isSessionRequestsActive = flowStep === 'C6';
  const isFindCoachActive = ['C1', 'C2', 'C3', 'C4'].includes(flowStep);
  const isMyRequestsActive = flowStep === 'C5';

  return (
    <header className="h-[72px] bg-[var(--panel-bg)] border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-40 select-none">
      {/* Zone 1: Logo & Portal Identity */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          type="button"
          onClick={() => setPortal(null)}
          className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] cursor-pointer bg-transparent border-0 p-0"
          aria-label="Athlete Directory - Return to Entry Points"
          title="Return to Entry Points"
        >
          <img
            src={theme === 'dark' ? '/assets/aistudio/logo-white_66712c11.png' : '/assets/aistudio/logo-black_7f50dcab.png'}
            alt="Athlete Directory"
            className="h-7 w-auto object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
              const parent = (e.target as HTMLElement).parentElement;
              if (parent && !parent.querySelector('.logo-fallback')) {
                const span = document.createElement('span');
                span.className = 'logo-fallback font-heading text-lg font-bold tracking-tight text-[var(--heading-color)] flex items-center gap-1.5';
                span.innerHTML = `<span style="color:var(--accent-red)">▲</span> ATHLETE DIRECTORY`;
                parent.appendChild(span);
              }
            }}
          />
        </button>

        {/* Portal Name Chip (when a portal is selected) */}
        {portal && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--border-color)] hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono-label text-[10px] text-[var(--heading-color)] bg-[var(--inset-bg)] border border-[var(--border-color)] px-2 py-0.5 whitespace-nowrap">
                {portal === 'business' && 'BUSINESS PORTAL'}
                {portal === 'individual' && 'INDIVIDUAL PORTAL'}
                {portal === 'academic' && 'ACADEMIC PORTAL'}
                {portal === 'athlete' && 'ATHLETE & PARENT'}
                {portal === 'registration' && 'REGISTRATION'}
              </span>
              {portal === 'athlete' && (
                <span className="px-1.5 py-0.5 border border-amber-500/40 text-amber-500 bg-amber-500/10 font-mono text-[9px] hidden lg:inline">
                  Preview
                </span>
              )}
            </div>
          </div>
        )}

        {/* Role Chip */}
        {portal && portal !== 'academic' && portal !== 'registration' && (
          <div
            className={`px-2 py-0.5 border font-mono-label text-[10px] tracking-wider hidden md:inline-flex items-center gap-1 ${
              role === 'Client'
                ? 'border-blue-500/40 text-blue-500 dark:text-blue-300 bg-blue-500/10'
                : 'border-emerald-600/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
            }`}
            title={`Active perspective: ${role}`}
          >
            <span>ROLE:</span>
            <span className="font-bold">{role.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Zone 2: Navigation inside active Portal */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1">
        {/* Business Portal: Buying / Selling Switcher */}
        {portal === 'business' && (
          <div className="flex items-center border border-[var(--border-color)] bg-[var(--inset-bg)] p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setMode('buying')}
              className={`px-2.5 py-1 text-xs font-mono-label transition-colors cursor-pointer ${
                mode === 'buying'
                  ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] font-bold border-b-2 border-[var(--accent-red)]'
                  : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Buying
            </button>
            <button
              type="button"
              onClick={() => setMode('selling')}
              className={`px-2.5 py-1 text-xs font-mono-label transition-colors cursor-pointer ${
                mode === 'selling'
                  ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] font-bold border-b-2 border-[var(--accent-red)]'
                  : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Selling
            </button>
          </div>
        )}

        {/* Portal Top Nav Items */}
        {portal === 'business' && mode === 'buying' && (
          <nav className="flex items-center gap-1" aria-label="Business Buying Navigation">
            <button
              type="button"
              onClick={() => setFlowStep('A1')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isFacilityActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Plan a facility
            </button>
            <button
              type="button"
              onClick={() => setFlowStep('B4')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isHireCoachActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Hire a coach
            </button>
          </nav>
        )}

        {portal === 'business' && mode === 'selling' && (
          <nav className="flex items-center gap-1" aria-label="Business Selling Navigation">
            <button
              type="button"
              onClick={() => setFlowStep('A4')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isRequestsActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Requests
            </button>
          </nav>
        )}

        {portal === 'individual' && (
          <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Individual Portal Navigation">
            <button
              type="button"
              onClick={() => setFlowStep('B1')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isProfileActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              My profile
            </button>
            <button
              type="button"
              onClick={() => setFlowStep('B2')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isOpportunitiesActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Opportunities
            </button>
            <button
              type="button"
              onClick={() => setFlowStep('B7')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isApplicationsActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              My applications
            </button>
            <button
              type="button"
              onClick={() => setFlowStep('C6')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isSessionRequestsActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Session requests
            </button>
          </nav>
        )}

        {portal === 'athlete' && (
          <nav className="flex items-center gap-1" aria-label="Athlete & Parent Navigation">
            <button
              type="button"
              onClick={() => setFlowStep('C1')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isFindCoachActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Find a coach
            </button>
            <button
              type="button"
              onClick={() => setFlowStep('C5')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer border ${
                isMyRequestsActive
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              My requests
            </button>
          </nav>
        )}

        {portal && (
          <button
            type="button"
            onClick={() => setPortal(null)}
            className="text-[11px] font-mono text-[var(--muted-color)] hover:text-[var(--text-primary)] px-2 py-1 flex items-center gap-1 cursor-pointer hidden xl:flex"
            title="Return to 4 Entry Points"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Switch portal</span>
          </button>
        )}
      </div>

      {/* Zone 3: Theme Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
          aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
          className="btn-action w-11 px-0 flex items-center justify-center text-[var(--muted-color)] hover:text-[var(--heading-color)]"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
};
