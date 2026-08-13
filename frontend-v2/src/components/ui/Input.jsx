import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './Button';

export const TextInput = forwardRef(({ label, className, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-[var(--color-text-muted)]">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full bg-[var(--color-bg-panel)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

export const SelectInput = forwardRef(({ label, options, className, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-[var(--color-text-muted)]">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full bg-[var(--color-bg-panel-hover)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none transition-all",
            props.disabled && "opacity-50 cursor-not-allowed"
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--color-bg-panel)] text-[var(--color-text-main)]">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
      </div>
    </div>
  );
});
