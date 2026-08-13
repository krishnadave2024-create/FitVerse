import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Medal } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import { calculateGamification } from '../../utils/gamification';
import { AchievementBadge } from './AchievementBadge';

export function AchievementsPreview() {
  const store = useStore();
  const gamification = calculateGamification(store);
  
  // Get all unlocked badges, then pad with locked ones if less than 4
  const unlocked = gamification.badges.filter(b => b.unlocked);
  const locked = gamification.badges.filter(b => !b.unlocked);
  
  const displayBadges = [...unlocked, ...locked].slice(0, 4);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-[24px] bg-[var(--color-bg-panel)] border border-[var(--color-border)] shadow-lg animate-in fade-in duration-500 delay-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Medal className="text-yellow-500" size={24} />
          <h2 className="text-lg font-bold text-[var(--color-text-main)]">Achievements</h2>
        </div>
        <Link to="/achievements" className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBadges.map(badge => (
          <AchievementBadge key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
