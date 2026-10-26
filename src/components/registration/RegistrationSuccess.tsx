import React from 'react';
import { useApp } from '../../context/AppContext';
import { getString } from '../../data/registrationStrings';
import { CheckCircle2, ArrowRight, ShieldAlert, User, Building2 } from 'lucide-react';

export const RegistrationSuccess: React.FC = () => {
  const { registrationDraft, setPortal, setMode } = useApp();
  const isCorp = registrationDraft.listingType === 'Sports Corporation';

  const name = isCorp
    ? registrationDraft.corporationTitle || 'Corporation'
    : `${registrationDraft.firstName} ${registrationDraft.lastName}`.trim() || 'Professional';

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-panel border border-border p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/30">
            {getString('reg.success.banner')}
          </div>
          <h2 className="text-2xl font-space font-bold text-heading">
            {getString('reg.success.title')}
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            {getString('reg.success.body')}
          </p>
        </div>

        <div className="bg-page border border-border p-5 text-start space-y-3">
          <div className="flex items-center gap-3">
            {isCorp ? (
              <Building2 className="w-5 h-5 text-accent" />
            ) : (
              <User className="w-5 h-5 text-accent" />
            )}
            <div>
              <div className="text-sm font-bold text-heading">{name}</div>
              <div className="text-xs font-mono text-muted">
                {isCorp ? registrationDraft.corporationType : registrationDraft.position || registrationDraft.professionalType}
                {registrationDraft.sport ? ` • ${registrationDraft.sport}` : ''}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-start gap-2.5 text-xs text-muted">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Your profile is now in the directory registry with a <strong className="text-amber-500">Pending</strong> badge. When verification checks complete, the verified badge is unlocked. You can audit and verify this registration from the Demo Controls panel (?demo=1).
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {isCorp ? (
            <button
              onClick={() => {
                setMode('selling');
                setPortal('business');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>View in Supplier Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setPortal('individual')}
              className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>View in Coach Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setPortal('athlete')}
            className="w-full sm:w-auto px-6 py-3 border border-border bg-page text-foreground font-mono text-xs uppercase tracking-wider hover:border-foreground/40 transition-colors min-h-[44px]"
          >
            {getString('reg.success.viewInDirectory')}
          </button>
        </div>
      </div>
    </div>
  );
};
