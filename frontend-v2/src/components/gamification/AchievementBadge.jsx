import React from 'react';
import * as LucideIcons from 'lucide-react';
import { format } from 'date-fns';

export function AchievementBadge({ badge, dateEarned }) {
  const IconComponent = LucideIcons[badge.icon] || LucideIcons.HelpCircle;

  if (badge.unlocked) {
    return (
      <div className="group relative flex flex-col items-center p-4 bg-[var(--color-bg-base)]/50 border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-[var(--color-bg-panel)] overflow-hidden">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${badge.color.replace('text-', 'bg-')}`} />
        
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-bg-panel)] border border-[var(--color-border)] shadow-lg shadow-${badge.color.split('-')[1]}-500/20 mb-3 group-hover:shadow-${badge.color.split('-')[1]}-500/40 transition-all`}>
          <IconComponent size={28} className={badge.color} />
        </div>
        
        <h4 className="text-sm font-bold text-center mb-1 text-[var(--color-text-main)] group-hover:text-white transition-colors">{badge.title}</h4>
        
        {/* Tooltip visible on hover */}
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-bg-panel)]/95 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center">
          <p className="text-xs text-[var(--color-text-main)] font-medium mb-1">{badge.description}</p>
          <div className="text-xs font-bold text-[var(--color-primary)] mb-2">+{badge.xpReward} XP</div>
          {dateEarned && <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Earned {format(new Date(dateEarned), 'MMM d, yyyy')}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center p-4 bg-[var(--color-bg-base)]/30 border border-[var(--color-border)]/50 rounded-2xl grayscale opacity-60">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-bg-panel)] border border-[var(--color-border)]/50 mb-3">
        <LucideIcons.Lock size={24} className="text-[var(--color-text-muted)]" />
      </div>
      <h4 className="text-sm font-semibold text-center mb-1 text-[var(--color-text-muted)]">{badge.title}</h4>
      <p className="text-[10px] text-center text-[var(--color-text-muted)] mt-2">Locked</p>
    </div>
  );
}
