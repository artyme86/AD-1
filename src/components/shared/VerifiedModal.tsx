import React from 'react';
import { ShieldCheck, X, CheckCircle2, FileText, Calendar, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const VerifiedModal: React.FC = () => {
  const { verifiedModalData, closeVerifiedModal } = useApp();

  if (!verifiedModalData || !verifiedModalData.isOpen) return null;

  const { title, details } = verifiedModalData;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verified-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-none"
      onClick={closeVerifiedModal}
    >
      <div
        className="w-full max-w-lg bg-[var(--panel-bg)] border border-[var(--border-color)] p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono-label text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL REGISTRY AUDIT</span>
            </div>
            <h2 id="verified-modal-title" className="text-lg font-heading text-[var(--heading-color)]">
              Verification Dossier: {title}
            </h2>
            <p className="text-xs text-[var(--muted-color)]">
              All credentials are independently cross-referenced with national sports governing bodies and statutory records.
            </p>
          </div>
          <button
            onClick={closeVerifiedModal}
            className="p-1.5 border border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--muted-color)] hover:text-[var(--text-primary)]"
            aria-label="Close verification modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit Details */}
        <div className="space-y-3.5 text-xs text-[var(--text-primary)]">
          {details.crNumber && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">COMMERCIAL REGISTRATION & AUDIT</span>
                <span className="font-semibold">{details.crNumber}</span>
                <span className="block text-[11px] text-[var(--muted-color)]">Issued by {details.authority || 'Ministry of Commerce & Industry'}</span>
              </div>
            </div>
          )}

          {details.idChecked && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">IDENTITY VERIFICATION</span>
                <span className="font-semibold">{details.idChecked}</span>
                <span className="block text-[11px] text-[var(--muted-color)]">Government ID biometric match confirmed</span>
              </div>
            </div>
          )}

          {details.licenseChecked && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <FileText className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">COACHING LICENSE & ACCREDITATION</span>
                <span className="font-semibold">{details.licenseChecked}</span>
                {details.licenseNumber && (
                  <span className="block font-mono text-[10px] text-[var(--muted-color)]">Registry Ref: {details.licenseNumber}</span>
                )}
              </div>
            </div>
          )}

          {details.policeClearance && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">BACKGROUND & CRIMINAL RECORD CHECK</span>
                <span className="font-semibold">{details.policeClearance}</span>
                <span className="block text-[11px] text-[var(--muted-color)]">Zero infraction history on sports registry</span>
              </div>
            </div>
          )}

          {(details.safeguarding || details.safeguardingClearance) && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">CHILD SAFEGUARDING CLEARANCE</span>
                <span className="font-semibold">{details.safeguarding || details.safeguardingClearance}</span>
                <span className="block text-[11px] text-[var(--muted-color)]">Compliant with Qatar Olympic Committee Child Protection Directive</span>
              </div>
            </div>
          )}

          {details.firstAid && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">FIRST AID & PEDIATRIC CPR</span>
                <span className="font-semibold">{details.firstAid}</span>
              </div>
            </div>
          )}

          {details.accreditations && details.accreditations.length > 0 && (
            <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)]">
              <span className="font-mono-label block text-[10px] text-[var(--muted-color)] mb-1.5">INDUSTRY ACCREDITATIONS</span>
              <div className="flex flex-wrap gap-1.5">
                {details.accreditations.map((acc: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[var(--panel-bg)] border border-[var(--border-color)] text-[11px] font-mono"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details.verifiedDate && (
            <div className="flex items-center justify-between text-[11px] text-[var(--muted-color)] pt-2 border-t border-[var(--border-color)]">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" /> Last audited: {details.verifiedDate}
              </span>
              <span className="text-emerald-500 font-mono-label">VERIFICATION ACTIVE</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={closeVerifiedModal}
            className="btn-action w-full sm:w-auto"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
