import React from 'react';
import { Panel } from './Panel';
import { cn } from './Button';

export function StatCard({ title, value, subtitle, icon: Icon, colorClass = "text-[var(--color-primary)]" }) {
  return (
    <Panel className="flex flex-col gap-2 p-5">
      <div className="flex justify-between items-start">
        <h3 className="text-[var(--color-text-muted)] text-sm font-medium">{title}</h3>
        {Icon && <Icon size={20} className={colorClass} />}
      </div>
      <div className={`${value === 'Complete your profile' ? 'text-sm font-medium text-yellow-500 mt-2' : 'text-3xl font-heading tracking-wide text-slate-900 dark:text-white'}`}>{value}</div>
      {subtitle && (
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{subtitle}</p>
      )}
    </Panel>
  );
}
