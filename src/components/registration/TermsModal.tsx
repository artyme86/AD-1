import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    >
      <div className="border border-[var(--border-color)] bg-[var(--panel-bg)] w-full max-w-2xl max-h-[85vh] flex flex-col justify-between overflow-hidden shadow-none">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--inset-bg)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="font-heading text-sm font-bold text-[var(--heading-color)]">
              Registry Terms of Service & Compliance Protocol
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[var(--muted-color)] hover:text-[var(--heading-color)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[var(--muted-color)] leading-relaxed">
          <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] font-mono text-xs">
            Draft terms for the prototype. Final terms will be reviewed by legal counsel before launch.
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              1. Registry Verification & Audit Authority
            </h4>
            <p>
              Draft terms for profile information and credential representation across directory listings.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              2. Safeguarding and Child Protection
            </h4>
            <p>
              Draft terms regarding safety standards and participant protection policies for youth activities.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              3. Privacy & Search Visibility
            </h4>
            <p>
              Draft terms outlining data preferences, search filtering, and public profile visibility choices.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              4. Commercial Integrity & Tenders
            </h4>
            <p>
              Draft terms covering tender submissions, procurement proposals, and vendor interactions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--inset-bg)] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-xs py-2 px-5"
          >
            I UNDERSTAND & AGREE
          </button>
        </div>
      </div>
    </div>
  );
};
