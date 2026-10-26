import React from 'react';

export type StatusType =
  | 'New'
  | 'Bid sent'
  | 'Shortlisted'
  | 'Accepted'
  | 'Declined'
  | 'Pending'
  | 'Applied'
  | 'Interview requested'
  | 'Planned'
  | 'Illustrative'
  | 'Sample';

interface StatusChipProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'sm', className = '' }) => {
  let styleClasses = 'border text-[11px] font-mono-label px-2 py-0.5 tracking-wider inline-flex items-center';

  switch (status) {
    case 'New':
      styleClasses += ' border-blue-500/40 text-blue-400 bg-blue-500/10 dark:text-blue-300';
      break;
    case 'Bid sent':
      styleClasses += ' border-amber-500/40 text-amber-500 bg-amber-500/10 dark:text-amber-400';
      break;
    case 'Shortlisted':
      styleClasses += ' border-purple-500/40 text-purple-600 bg-purple-500/10 dark:text-purple-300';
      break;
    case 'Accepted':
      styleClasses += ' border-emerald-600/50 text-emerald-600 bg-emerald-500/10 dark:text-emerald-400';
      break;
    case 'Declined':
      styleClasses += ' border-red-500/40 text-red-500 bg-red-500/10 dark:text-red-400';
      break;
    case 'Pending':
      styleClasses += ' border-amber-500/30 text-amber-500 bg-amber-500/5';
      break;
    case 'Interview requested':
      styleClasses += ' border-cyan-500/40 text-cyan-600 bg-cyan-500/10 dark:text-cyan-300';
      break;
    case 'Planned':
      styleClasses += ' border-dashed border-[#94A3B8] text-[#94A3B8] bg-transparent';
      break;
    case 'Illustrative':
      styleClasses += ' border-[#475569] text-[#94A3B8] bg-transparent';
      break;
    case 'Sample':
      styleClasses += ' border-[#2E323A] text-[#94A3B8] bg-transparent';
      break;
    default:
      styleClasses += ' border-current opacity-80';
  }

  const padding = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]';

  return (
    <span className={`${styleClasses} ${padding} ${className}`}>
      {status}
    </span>
  );
};
