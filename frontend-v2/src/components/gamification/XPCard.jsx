import React, { useEffect, useState } from 'react';
import { Trophy, Dumbbell, Utensils, Droplets, Star } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import { calculateGamification } from '../../utils/gamification';

export function XPCard() {
  const store = useStore();
  const gamification = calculateGamification(store);
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    // Simple mount animation for the progress bar
    const timer = setTimeout(() => {
      setAnimatedPct(gamification.progressPct);
    }, 300);
    return () => clearTimeout(timer);
  }, [gamification.progressPct]);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-[24px] bg-[var(--color-bg-panel)] border border-[var(--color-border)] shadow-lg animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Current Level</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
              {gamification.currentLevel}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-600/20 text-yellow-500 border border-yellow-500/30">
          <Trophy size={28} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-[var(--color-text-main)]">{gamification.totalXP} XP</span>
          <span className="text-[var(--color-text-muted)]">{gamification.xpNeededForNextLevel - gamification.xpIntoCurrentLevel} XP until Lvl {gamification.currentLevel + 1}</span>
        </div>
        <div className="w-full h-3 bg-[var(--color-bg-base)] rounded-full overflow-hidden border border-[var(--color-border)]">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${animatedPct}%` }}
          />
        </div>
      </div>

      {/* XP Breakdown Chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[var(--color-border)]/50">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)]/50 hover:bg-[var(--color-bg-base)]/80 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] uppercase"><Dumbbell size={14} className="text-orange-400"/> Workouts</div>
          <div className="text-sm font-bold text-[var(--color-text-main)]">+{gamification.xpBreakdown.workouts} XP</div>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)]/50 hover:bg-[var(--color-bg-base)]/80 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] uppercase"><Utensils size={14} className="text-green-400"/> Meals</div>
          <div className="text-sm font-bold text-[var(--color-text-main)]">+{gamification.xpBreakdown.meals} XP</div>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)]/50 hover:bg-[var(--color-bg-base)]/80 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] uppercase"><Droplets size={14} className="text-blue-400"/> Water</div>
          <div className="text-sm font-bold text-[var(--color-text-main)]">+{gamification.xpBreakdown.water} XP</div>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)]/50 hover:bg-[var(--color-bg-base)]/80 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] uppercase"><Star size={14} className="text-yellow-400"/> Badges</div>
          <div className="text-sm font-bold text-[var(--color-text-main)]">+{gamification.xpBreakdown.badges} XP</div>
        </div>
      </div>
    </div>
  );
}
