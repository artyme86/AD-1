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
          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              1. Registry Verification & Audit Authority
            </h4>
            <p>
              By submitting this registration dossier, you confirm that all stated coaching licenses, academic degrees, commercial certificates, and corporate authorities are authentic. All credentials undergo independent governing body verification before obtaining accredited directory status.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              2. Safeguarding and Child Protection
            </h4>
            <p>
              For youth coaching and sports instruction involving minors (ages 7 to 17), valid background clearance and SafeSport accreditation are mandatory prerequisites for direct booking activations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              3. Privacy & Search Visibility
            </h4>
            <p>
              Country, nationality, and gender selections are utilized strictly for search criteria filtering. You retain continuous administrative control over which demographic attributes appear on your public directory profile.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[var(--heading-color)] text-sm mb-1">
              4. Commercial Integrity & Tenders
            </h4>
            <p>
              Corporate suppliers and facility contractors are evaluated on documented civil specifications, ISO standards, and proven after-sales service warranties. Bids submitted via the directory are binding for the stated delivery period.
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
