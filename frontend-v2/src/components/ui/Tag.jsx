import React from 'react';
import { cn } from './Button';

export function Tag({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-[var(--color-bg-panel-hover)] text-[var(--color-text-muted)]',
    primary: 'bg-[var(--color-primary-transparent)] text-[var(--color-primary)]',
    ember: 'bg-orange-500/10 text-orange-400',
    blue: 'bg-blue-500/10 text-blue-400',
    success: 'bg-emerald-500/10 text-emerald-400',
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider", variants[variant], className)}>
      {children}
    </span>
  );
}
