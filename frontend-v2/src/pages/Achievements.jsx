import React from 'react';
import { Trophy, Medal, Star, Target } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { calculateGamification } from '../utils/gamification';
import { AchievementBadge } from '../components/gamification/AchievementBadge';
import { Panel } from '../components/ui/Panel';

export default function Achievements() {
  const store = useStore();
  const gamification = calculateGamification(store);

  const unlockedCount = gamification.badges.filter(b => b.unlocked).length;
  const totalCount = gamification.badges.length;
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)]">Achievements</h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-lg">
          Track your progress and unlock legendary badges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel className="flex items-center gap-4 border-l-4 border-l-yellow-500">
          <div className="bg-yellow-500/10 p-4 rounded-full text-yellow-500">
            <Medal size={24} />
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] font-bold uppercase">Badges Unlocked</div>
            <div className="text-2xl font-black">{unlockedCount} <span className="text-sm text-[var(--color-text-muted)] font-normal">/ {totalCount}</span></div>
          </div>
        </Panel>
        
        <Panel className="flex items-center gap-4 border-l-4 border-l-[var(--color-primary)]">
          <div className="bg-[var(--color-primary)]/10 p-4 rounded-full text-[var(--color-primary)]">
            <Star size={24} />
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] font-bold uppercase">Total XP</div>
            <div className="text-2xl font-black">{gamification.totalXP}</div>
          </div>
        </Panel>
        
        <Panel className="flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="bg-purple-500/10 p-4 rounded-full text-purple-500">
            <Target size={24} />
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] font-bold uppercase">Current Level</div>
            <div className="text-2xl font-black">{gamification.currentLevel}</div>
          </div>
        </Panel>
      </div>

      <Panel className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">All Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gamification.badges.map(badge => (
            <AchievementBadge key={badge.id} badge={badge} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
