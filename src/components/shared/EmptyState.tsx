import React from 'react';
import { Inbox, MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'inbox' | 'message';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 text-center border border-dashed border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="p-3 border border-[var(--border-color)] text-[var(--muted-color)] bg-[var(--inset-bg)]">
        {icon === 'message' ? (
          <MessageSquare className="w-5 h-5 text-[var(--muted-color)]" />
        ) : (
          <Inbox className="w-5 h-5 text-[var(--muted-color)]" />
        )}
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="font-heading text-sm text-[var(--heading-color)]">{title}</h4>
        <p className="text-xs text-[var(--muted-color)] leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-action mt-2 text-[10px]">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
