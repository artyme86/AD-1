import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const AcademicPortal: React.FC = () => {
  const { setPortal } = useApp();

  return (
    <div className="max-w-[800px] mx-auto py-12 px-4 space-y-8">
      <div>
        <button
          type="button"
          onClick={() => setPortal(null)}
          className="btn-action text-xs gap-2 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO REGISTRY SELECTION</span>
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-center text-[var(--heading-color)]">
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-mono-label text-xs text-[var(--muted-color)]">ACADEMIC & RESEARCH PORTAL</span>
          <StatusChip status="Planned" />
        </div>

        <h1 className="text-3xl font-heading text-[var(--heading-color)] font-bold">
          Academic & Research Network
        </h1>
      </div>

      <div className="p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
        <p className="text-base text-[var(--text-primary)] leading-relaxed">
          Planned portal. Intended interactions: research and testing requests between labs, clubs and companies; cohort calls for studies; certification programs.
        </p>

        <div className="pt-4 border-t border-[var(--border-color)] text-xs text-[var(--muted-color)] font-mono">
          <span>Status: Specifications under development with institutional research partners.</span>
        </div>
      </div>
    </div>
  );
};
