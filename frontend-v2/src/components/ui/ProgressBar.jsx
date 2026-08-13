import React from 'react';
import { cn } from './Button';

export function ProgressBar({ progress, max = 100, colorClass = "bg-[var(--color-primary)]", heightClass = "h-2", label }) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)] font-medium">{label}</span>
          <span className="text-[var(--color-text-muted)]">{progress} / {max}</span>
        </div>
      )}
      <div className={cn("w-full bg-[var(--color-bg-panel-hover)] rounded-full overflow-hidden", heightClass)}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
