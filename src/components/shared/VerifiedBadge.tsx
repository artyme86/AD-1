import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

interface VerifiedBadgeProps {
  name: string;
  details: Record<string, any>;
  showHelpIcon?: boolean;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  name,
  details,
  showHelpIcon = true,
  className = ''
}) => {
  const { openVerifiedModal } = useApp();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openVerifiedModal(name, details);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Click to view what was checked"
      className={`inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-600/40 text-emerald-600 dark:text-emerald-400 font-mono-label text-[10px] tracking-wider transition-colors hover:bg-emerald-500/20 cursor-pointer ${className}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <span>VERIFIED</span>
      {showHelpIcon && (
        <span className="flex items-center text-[9px] opacity-75 underline decoration-emerald-500/50 underline-offset-2 ml-0.5">
          What was checked?
        </span>
      )}
    </button>
  );
};
