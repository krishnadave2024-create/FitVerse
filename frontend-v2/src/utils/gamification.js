import { format } from 'date-fns';

export const XP_RULES = {
  WORKOUT_LOGGED: 20,
  MEAL_LOGGED: 10,
  WATER_GOAL_MET: 15,
  GOAL_COMPLETED: 50,
  STREAK_7_DAY: 100
};

export const BADGE_DEFINITIONS = [
  { id: 'first_workout', title: 'First Workout', description: 'Complete your first workout.', icon: 'Dumbbell', xpReward: 50, color: 'text-orange-400' },
  { id: 'streak_7', title: '7 Day Streak', description: 'Exercise for seven consecutive days.', icon: 'Flame', xpReward: 100, color: 'text-red-500' },
  { id: 'water_master', title: 'Water Master', description: 'Reach your daily water goal for seven days.', icon: 'Droplets', xpReward: 100, color: 'text-blue-400' },
  { id: 'healthy_week', title: 'Healthy Week', description: 'Log meals for seven consecutive days.', icon: 'Utensils', xpReward: 100, color: 'text-green-400' },
  { id: 'beast_mode', title: 'Beast Mode', description: 'Complete 50 workouts.', icon: 'Zap', xpReward: 250, color: 'text-purple-500' },
  { id: 'workouts_100', title: '100 Workouts', description: 'Complete 100 workouts.', icon: 'Trophy', xpReward: 500, color: 'text-yellow-400' },
  { id: 'level_25', title: 'Fitness Champion', description: 'Reach Level 25.', icon: 'Crown', xpReward: 1000, color: 'text-yellow-500' },
  { id: 'xp_5000', title: 'XP Master', description: 'Earn 5000 XP.', icon: 'Star', xpReward: 500, color: 'text-cyan-400' },
];

export function calculateLevel(totalXP) {
  if (totalXP <= 0) return { currentLevel: 1, totalXP: 0, xpIntoCurrentLevel: 0, xpNeededForNextLevel: 50, nextLevelXP: 50, progressPct: 0 };

  const currentLevel = Math.floor(Math.sqrt(totalXP / 50)) + 1;
  const currentLevelBaseXP = 50 * Math.pow(currentLevel - 1, 2);
  const nextLevelXP = 50 * Math.pow(currentLevel, 2);
  
  const xpIntoCurrentLevel = totalXP - currentLevelBaseXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelBaseXP;
  
  const progressPct = Math.min(100, Math.max(0, (xpIntoCurrentLevel / xpNeededForNextLevel) * 100));

  return {
    currentLevel,
    totalXP,
    xpIntoCurrentLevel,
    xpNeededForNextLevel,
    nextLevelXP,
    progressPct
  };
}

export function calculateGamification(store) {
  const { workouts = [], meals = [], water = [], user = {} } = store;
  
  let xpBreakdown = {
    workouts: 0,
    meals: 0,
    water: 0,
    badges: 0
  };

  xpBreakdown.workouts = workouts.length * XP_RULES.WORKOUT_LOGGED;
  xpBreakdown.meals = meals.length * XP_RULES.MEAL_LOGGED;
  
  const waterGoal = user.daily_water_goal || 3000;
  const waterByDate = water.reduce((acc, w) => {
    acc[w.date] = (acc[w.date] || 0) + w.amount;
    return acc;
  }, {});
  
  let daysWaterMet = 0;
  for (const date in waterByDate) {
    if (waterByDate[date] >= waterGoal) {
      daysWaterMet++;
    }
  }
  xpBreakdown.water = daysWaterMet * XP_RULES.WATER_GOAL_MET;

  const unlockedBadges = [];
  if (workouts.length >= 1) unlockedBadges.push('first_workout');
  if (workouts.length >= 50) unlockedBadges.push('beast_mode');
  if (workouts.length >= 100) unlockedBadges.push('workouts_100');
  if (daysWaterMet >= 7) unlockedBadges.push('water_master');

  BADGE_DEFINITIONS.forEach(b => {
    if (unlockedBadges.includes(b.id)) {
      xpBreakdown.badges += b.xpReward;
    }
  });

  const totalXP = xpBreakdown.workouts + xpBreakdown.meals + xpBreakdown.water + xpBreakdown.badges;
  
  if (totalXP >= 5000 && !unlockedBadges.includes('xp_5000')) {
    unlockedBadges.push('xp_5000');
    xpBreakdown.badges += 500;
  }
  
  const levelData = calculateLevel(totalXP + (unlockedBadges.includes('xp_5000') ? 500 : 0));
  
  if (levelData.currentLevel >= 25 && !unlockedBadges.includes('level_25')) {
    unlockedBadges.push('level_25');
    xpBreakdown.badges += 1000;
  }

  const finalTotalXP = xpBreakdown.workouts + xpBreakdown.meals + xpBreakdown.water + xpBreakdown.badges;
  const finalLevelData = calculateLevel(finalTotalXP);

  const badges = BADGE_DEFINITIONS.map(def => ({
    ...def,
    unlocked: unlockedBadges.includes(def.id)
  }));

  return {
    ...finalLevelData,
    xpBreakdown,
    badges
  };
}
