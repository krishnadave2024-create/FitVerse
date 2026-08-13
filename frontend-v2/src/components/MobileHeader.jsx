import React from 'react';
import { Menu, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function MobileHeader({ onMenuClick }) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-bg-panel)] border-b border-[var(--color-border)] z-30 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-[var(--color-primary)]">
        <Activity size={24} />
        <h1 className="text-2xl font-heading tracking-wider mt-1 text-[var(--color-text-main)]">FitVerse</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button onClick={onMenuClick} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] p-2">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

