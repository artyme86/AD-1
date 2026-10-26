import React, { useState } from 'react';
import { Sun, Moon, Smartphone, Monitor, ChevronDown, Check } from 'lucide-react';
import { useApp, Persona, FlowId } from '../../context/AppContext.tsx';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    persona,
    setPersona,
    role,
    activeFlow,
    setActiveFlow,
    viewportMode,
    setViewportMode
  } = useApp();

  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const personas: { id: Persona; label: string; role: 'Client' | 'Provider'; hint: string }[] = [
    { id: 'Club', label: 'Club / Developer', role: 'Client', hint: 'Facility tenders & coach recruitment' },
    { id: 'Supplier', label: 'Sports Supplier', role: 'Provider', hint: 'Tender requests & quotes' },
    { id: 'Coach', label: 'Youth Coach', role: 'Provider', hint: 'Club vacancies & private sessions' },
    { id: 'Parent', label: 'Parent / Guardian', role: 'Client', hint: 'Private coach discovery & booking' }
  ];

  const flows: { id: FlowId; label: string; desc: string }[] = [
    { id: 'A', label: 'A. B2B Facility', desc: 'Club ↔ Supplier' },
    { id: 'B', label: 'B. Club Coach', desc: 'Club ↔ Coach' },
    { id: 'C', label: 'C. Private Coach', desc: 'Parent ↔ Coach' }
  ];

  return (
    <header className="h-[72px] bg-[var(--panel-bg)] border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 select-none">
      {/* Zone 1: Brand & Role Lockup */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <a href="#home" className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]" aria-label="Athlete Directory Homepage">
          <img
            src={theme === 'dark' ? '/assets/aistudio/logo-white_66712c11.png' : '/assets/aistudio/logo-black_7f50dcab.png'}
            alt="Athlete Directory"
            className="h-7 w-auto object-contain shrink-0"
            onError={(e) => {
              // Graceful fallback to styled SVG wordmark if local asset rendering has glitch
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
        </a>

        {/* Role Chip */}
        <div
          className={`px-2 py-0.5 border font-mono-label text-[10px] tracking-wider hidden sm:inline-flex items-center gap-1 ${
            role === 'Client'
              ? 'border-blue-500/40 text-blue-500 dark:text-blue-300 bg-blue-500/10'
              : 'border-emerald-600/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
          }`}
          title={`Active perspective: ${role}`}
        >
          <span>ROLE:</span>
          <span className="font-bold">{role.toUpperCase()}</span>
        </div>
      </div>

      {/* Zone 2: Flow Switcher Navigation */}
      <nav className="flex items-center gap-1 border border-[var(--border-color)] bg-[var(--inset-bg)] p-0.5 overflow-x-auto" aria-label="Scenario Selector">
        {flows.map((f) => {
          const isActive = activeFlow === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFlow(f.id)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-label transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-[var(--accent-red)] font-bold'
                  : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{f.label}</span>
              <span className="text-[9px] opacity-60 hidden md:inline">({f.desc})</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Persona Switcher, Viewport Mode & Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Persona "View As" Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
            className="btn-action text-[11px] gap-2 px-2.5 sm:px-3"
            aria-expanded={personaDropdownOpen}
            aria-haspopup="true"
          >
            <span className="text-[var(--muted-color)] hidden lg:inline font-mono">VIEW AS:</span>
            <span className="text-[var(--heading-color)] font-bold">{persona}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-color)]" />
          </button>

          {personaDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setPersonaDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-64 bg-[var(--panel-bg)] border border-[var(--border-color)] z-40 py-1">
                <div className="px-3 py-1.5 text-[10px] font-mono-label text-[var(--muted-color)] border-b border-[var(--border-color)]">
                  SELECT PERSONA PERSPECTIVE
                </div>
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPersona(p.id);
                      setPersonaDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[var(--inset-bg)] transition-colors cursor-pointer ${
                      persona === p.id ? 'bg-[var(--inset-bg)] text-[var(--accent-text)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{p.label}</span>
                        <span className="text-[9px] font-mono px-1 border border-[var(--border-color)] text-[var(--muted-color)]">
                          {p.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-[var(--muted-color)]">{p.hint}</div>
                    </div>
                    {persona === p.id && <Check className="w-4 h-4 text-[var(--accent-red)]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Viewport Width Preview Toggle (Responsive / Mobile 390px) */}
        {(activeFlow === 'B' || activeFlow === 'C') && (
          <button
            type="button"
            onClick={() => setViewportMode(viewportMode === 'responsive' ? 'mobile390' : 'responsive')}
            title={viewportMode === 'responsive' ? "Preview 390px mobile layout" : "Switch to 1440px desktop layout"}
            className={`btn-action px-2.5 hidden md:flex items-center gap-1 text-[11px] ${
              viewportMode === 'mobile390' ? 'border-[var(--accent-red)] text-[var(--accent-text)] bg-[var(--inset-bg)]' : ''
            }`}
          >
            {viewportMode === 'responsive' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[var(--muted-color)]" />
                <span className="hidden xl:inline">390PX MOBILE</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                <span className="hidden xl:inline">1440PX DESKTOP</span>
              </>
            )}
          </button>
        )}

        {/* Theme Toggle Button */}
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
