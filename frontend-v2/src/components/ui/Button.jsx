import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  fullWidth, 
  icon: Icon,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-base)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]",
    secondary: "bg-[var(--color-bg-panel-hover)] text-[var(--color-text-main)] hover:bg-slate-700 focus:ring-slate-500",
    ghost: "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-panel-hover)] hover:text-[var(--color-text-main)] focus:ring-[var(--color-border)]",
    ember: "bg-[var(--color-accent-orange)] text-[var(--color-text-inverse)] hover:brightness-110 focus:ring-[var(--color-accent-orange)]",
    danger: "bg-[var(--color-accent-red)] text-[var(--color-text-inverse)] hover:brightness-110 focus:ring-[var(--color-accent-red)]",
    outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-transparent)] focus:ring-[var(--color-primary)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[props.size || 'md'],
        fullWidth && "w-full",
        className
      )} 
      {...props}
    >
      {Icon && <Icon size={props.size === 'sm' ? 16 : 20} />}
      {children}
    </button>
  );
}
