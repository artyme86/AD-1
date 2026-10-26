import React from 'react';
import { User, Building2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { getString } from '../../data/registrationStrings.ts';

interface R1Props {
  error?: string;
}

export const R1ListingType: React.FC<R1Props> = ({ error }) => {
  const { registrationDraft, updateRegistrationDraft } = useApp();

  const handleSelect = (type: 'Sports Professional' | 'Sports Corporation') => {
    updateRegistrationDraft({
      listingType: type,
      // If switching type, reset secondary specific type
      professionalType: type === 'Sports Professional' ? registrationDraft.professionalType : '',
      corporationType: type === 'Sports Corporation' ? registrationDraft.corporationType : ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r1.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r1.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Card 1: Sports Professional */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSelect('Sports Professional')}
          onKeyDown={(e) => e.key === 'Enter' && handleSelect('Sports Professional')}
          className={`border p-6 cursor-pointer transition-all flex flex-col justify-between min-h-[180px] ${
            registrationDraft.listingType === 'Sports Professional'
              ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] ring-1 ring-[var(--accent-red)]'
              : 'border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)]'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-emerald-500">
                <User className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 border flex items-center justify-center ${
                  registrationDraft.listingType === 'Sports Professional'
                    ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                    : 'border-[var(--border-color)]'
                }`}
              >
                {registrationDraft.listingType === 'Sports Professional' && (
                  <Check className="w-4 h-4 stroke-[3]" />
                )}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-[var(--heading-color)] mb-1">
                {getString('reg.r1.professionalTitle')}
              </h3>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                {getString('reg.r1.professionalDesc')}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--accent-text)] font-bold">INDIVIDUAL LISTING</span>
            <span className="text-[var(--muted-color)]">4 Specialization Streams</span>
          </div>
        </div>

        {/* Card 2: Sports Corporation */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSelect('Sports Corporation')}
          onKeyDown={(e) => e.key === 'Enter' && handleSelect('Sports Corporation')}
          className={`border p-6 cursor-pointer transition-all flex flex-col justify-between min-h-[180px] ${
            registrationDraft.listingType === 'Sports Corporation'
              ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] ring-1 ring-[var(--accent-red)]'
              : 'border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)]'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--accent-text)]">
                <Building2 className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 border flex items-center justify-center ${
                  registrationDraft.listingType === 'Sports Corporation'
                    ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                    : 'border-[var(--border-color)]'
                }`}
              >
                {registrationDraft.listingType === 'Sports Corporation' && (
                  <Check className="w-4 h-4 stroke-[3]" />
                )}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-[var(--heading-color)] mb-1">
                {getString('reg.r1.corporationTitle')}
              </h3>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                {getString('reg.r1.corporationDesc')}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--accent-text)] font-bold">CORPORATE LISTING</span>
            <span className="text-[var(--muted-color)]">5 Commercial Categories</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 border border-amber-500/50 bg-amber-500/10 text-xs font-mono text-amber-500 flex items-center gap-2">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
