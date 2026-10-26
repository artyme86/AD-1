import React, { useState, useEffect } from 'react';
import { Sliders, X, Sun, Moon, Smartphone, Monitor, RefreshCw, Play, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const DemoControls: React.FC = () => {
  const {
    theme,
    toggleTheme,
    persona,
    setPersona,
    viewportMode,
    setViewportMode,
    resetDemoData,
    isTenderSent,
    selectedPackageForComparison,
    tenderPackages,
    simulateSupplierBids,
    verifyLatestRegistration,
    latestRegisteredEntityId
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsDemoActive(params.get('demo') === '1');
    }
  }, []);

  if (!isDemoActive) {
    return null;
  }

  const activePackageId = selectedPackageForComparison || tenderPackages[0]?.id || 'pkg-turf';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Demo Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-primary text-xs py-2 px-3 gap-2 shadow-lg border border-[var(--border-color)] bg-[var(--panel-bg)] text-[var(--heading-color)] hover:border-[var(--accent-red)] flex items-center cursor-pointer"
          title="Open Demo Controls Panel"
        >
          <Sliders className="w-3.5 h-3.5 text-[var(--accent-text)]" />
          <span className="font-mono-label text-[11px]">DEMO</span>
        </button>
      )}

      {/* Floating Demo Panel */}
      {isOpen && (
        <div className="w-80 bg-[var(--panel-bg)] border-2 border-[var(--border-color)] p-4 shadow-2xl space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[var(--heading-color)]">
              <Sliders className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              <span>DEMO CONTROLS</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:text-[var(--accent-text)] text-[var(--muted-color)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Jump to Persona */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono-label text-[var(--muted-color)]">
              JUMP TO PERSONA
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setPersona('Club')}
                className={`px-2 py-1.5 text-left border cursor-pointer flex items-center justify-between ${
                  persona === 'Club'
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                    : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Club (Client)</span>
                {persona === 'Club' && <Check className="w-3 h-3 text-[var(--accent-red)]" />}
              </button>

              <button
                type="button"
                onClick={() => setPersona('Supplier')}
                className={`px-2 py-1.5 text-left border cursor-pointer flex items-center justify-between ${
                  persona === 'Supplier'
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                    : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Supplier (Provider)</span>
                {persona === 'Supplier' && <Check className="w-3 h-3 text-[var(--accent-red)]" />}
              </button>

              <button
                type="button"
                onClick={() => setPersona('Coach')}
                className={`px-2 py-1.5 text-left border cursor-pointer flex items-center justify-between ${
                  persona === 'Coach'
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                    : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Coach (Provider)</span>
                {persona === 'Coach' && <Check className="w-3 h-3 text-[var(--accent-red)]" />}
              </button>

              <button
                type="button"
                onClick={() => setPersona('Parent')}
                className={`px-2 py-1.5 text-left border cursor-pointer flex items-center justify-between ${
                  persona === 'Parent'
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                    : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Parent (Client)</span>
                {persona === 'Parent' && <Check className="w-3 h-3 text-[var(--accent-red)]" />}
              </button>
            </div>
          </div>

          {/* Theme & Mobile Preview */}
          <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
            <div className="text-[10px] font-mono-label text-[var(--muted-color)]">
              DISPLAY CONTROLS
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="btn-action flex-1 text-xs py-1.5 gap-1.5"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>LIGHT THEME</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>DARK THEME</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setViewportMode(viewportMode === 'responsive' ? 'mobile390' : 'responsive')}
                className={`btn-action flex-1 text-xs py-1.5 gap-1.5 ${
                  viewportMode === 'mobile390' ? 'border-[var(--accent-red)] text-[var(--accent-text)]' : ''
                }`}
              >
                {viewportMode === 'responsive' ? (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-[var(--muted-color)]" />
                    <span>390PX MOBILE</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                    <span>DESKTOP</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulate Bids */}
          <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
            <div className="text-[10px] font-mono-label text-[var(--muted-color)]">
              SUPPLIER SIMULATION
            </div>
            <button
              type="button"
              disabled={!isTenderSent}
              onClick={() => {
                simulateSupplierBids(activePackageId);
              }}
              className="w-full btn-action text-xs py-2 gap-1.5 justify-center text-amber-500 border-amber-500/40 hover:bg-amber-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-3.5 h-3.5" />
              <span>SIMULATE 2 SUPPLIER BIDS</span>
            </button>
            {!isTenderSent && (
              <p className="text-[10px] text-[var(--muted-color)] leading-tight">
                Send a tender first from the Plan a facility flow to enable bid simulation.
              </p>
            )}
          </div>

          {/* Verify Latest Registration */}
          <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
            <div className="text-[10px] font-mono-label text-[var(--muted-color)]">
              REGISTRATION AUDIT
            </div>
            <button
              type="button"
              disabled={!latestRegisteredEntityId}
              onClick={() => {
                verifyLatestRegistration();
              }}
              className="w-full btn-action text-xs py-2 gap-1.5 justify-center text-emerald-500 border-emerald-500/40 hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check className="w-3.5 h-3.5" />
              <span>VERIFY LATEST REGISTRATION</span>
            </button>
            {!latestRegisteredEntityId ? (
              <p className="text-[10px] text-[var(--muted-color)] leading-tight">
                Submit a registration to audit and unlock verified badge status.
              </p>
            ) : (
              <p className="text-[10px] text-emerald-500/80 leading-tight font-mono">
                Latest pending: {latestRegisteredEntityId}
              </p>
            )}
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => {
                resetDemoData();
              }}
              className="w-full btn-action text-xs py-2 gap-1.5 justify-center text-[var(--accent-text)] border-[var(--accent-red)]/50 hover:bg-red-500/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET DEMO DATA</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
