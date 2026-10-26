import React from 'react';
import { Check } from 'lucide-react';
import { StatusChip } from './StatusChip.tsx';

export interface StepItem {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
  isPlanned?: boolean;
}

interface StepperProps {
  steps: StepItem[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex items-center min-w-max border border-[var(--border-color)] bg-[var(--panel-bg)] p-1">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono-label transition-colors ${
                  isActive
                    ? 'bg-[var(--inset-bg)] text-[var(--accent-text)] border-b-2 border-[var(--accent-red)]'
                    : isCompleted
                    ? 'text-emerald-500'
                    : 'text-[var(--muted-color)] opacity-70'
                }`}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center text-[10px] border shrink-0 ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                      : isActive
                      ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                      : 'border-[var(--border-color)] text-[var(--muted-color)]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                </div>
                <span className="whitespace-nowrap">{step.label}</span>
                {step.isPlanned && (
                  <StatusChip status="Planned" size="sm" className="ml-1 text-[9px] py-0 px-1" />
                )}
              </div>
              {idx < steps.length - 1 && (
                <div className="w-6 h-[1px] bg-[var(--border-color)] shrink-0 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
