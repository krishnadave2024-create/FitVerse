import React, { useState, useEffect } from 'react';
import { useStore } from '../store/StoreContext';
import { format } from 'date-fns';
import {
  Flame, Droplets, Trophy, Scale, Plus, Utensils,
  Bot, CloudSun, CheckCircle2, Circle, Crown, ArrowUpRight, Activity, AlertTriangle, Loader2,
  TrendingDown, TrendingUp, Sparkles, BrainCircuit, Dumbbell, Play, Target
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Panel } from '../components/ui/Panel';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Link } from '@tanstack/react-router';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  AreaChart, Area, LineChart, Line
} from "recharts";
import api from '../services/api';

// Error Boundary Component to prevent React crashes
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Dashboard Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-red-500/10 border border-red-500/30 rounded-2xl">
          <AlertTriangle className="text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong</h2>
          <p className="text-red-400/80">Please refresh the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

import { XPCard } from '../components/gamification/XPCard';
import { AchievementsPreview } from '../components/gamification/AchievementsPreview';

// SVG Circular Progress Ring Component
const ProgressRing = ({ radius, stroke, progress, colorClass, icon: Icon, label }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const safeProgress = Number.isNaN(progress) ? 0 : progress;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="rgba(255,255,255,0.1)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={`transition-all duration-1000 ease-out animate-progress ${colorClass}`}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex items-center justify-center text-white">
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{label}</span>
    </div>
  );
};

function DashboardContent() {
  const { user, meals, water, workouts, isLoading, currentWeight } = useStore();
  const [mounted, setMounted] = useState(false);

  // AI States
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (isLoading || currentWeight === undefined) return;
    
    const fetchAI = async () => {
      setAiLoading(true);
      try {
        const [predRes, recRes] = await Promise.all([
          api.get(`/ml/weight-prediction/?current_weight=${currentWeight}`),
          api.get(`/ml/workout-recommendation/?current_weight=${currentWeight}`)
        ]);
        setPrediction(predRes.data);
        setRecommendation(recRes.data);
      } catch (err) {
        console.error("Failed to load AI data", err);
      } finally {
        setAiLoading(false);
      }
    };
    fetchAI();
  }, [isLoading, currentWeight]);

  if (!mounted || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={48} />
        <p className="text-[var(--color-text-muted)] font-medium tracking-widest uppercase">Loading Dashboard...</p>
      </div>
    );
  }

  // Safe Defaults
  const safeUser = user || {};
  const safeMeals = Array.isArray(meals) ? meals : [];
  const safeWater = Array.isArray(water) ? water : [];
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const currentHour = today.getHours();

  // Dynamic Greeting
  let greeting = 'Good Evening';
  let greetingIcon = '🌙';
  if (currentHour < 12) {
    greeting = 'Good Morning';
    greetingIcon = '🌅';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
    greetingIcon = '☀️';
  }

  // Daily Quote (Pseudo-random based on day of year)
  const quotes = [
    "Small progress every day leads to big results.",
    "Discipline beats motivation.",
    "Stay consistent. Results will follow.",
    "Crush your goals today.",
    "Push harder than yesterday if you want a different tomorrow."
  ];
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const todaysQuote = quotes[dayOfYear % quotes.length] || quotes[0];

  // Calculate today's stats safely
  const todaysMeals = safeMeals.filter(m => m?.date === todayStr);
  const todaysCalories = todaysMeals.reduce((acc, curr) => acc + (curr?.calories || 0), 0);
  const todaysProtein = todaysMeals.reduce((acc, curr) => acc + (curr?.protein || 0), 0);
  const todaysCarbs = todaysMeals.reduce((acc, curr) => acc + (curr?.carbs || 0), 0);
  const todaysFat = todaysMeals.reduce((acc, curr) => acc + (curr?.fat || 0), 0);

  const todaysWater = safeWater.filter(w => w?.date === todayStr).reduce((acc, curr) => acc + (curr?.amount || 0), 0);
  const waterGoal = safeUser.daily_water_goal || 3000;

  const totalBurned = safeWorkouts.filter(w => w?.date === todayStr).reduce((acc, curr) => acc + ((curr?.duration || 0) * 8), 0);
  const calorieBurnGoal = safeUser.daily_calorie_goal || 500;
  const proteinGoal = safeUser.daily_protein_goal || 160;
  const hasWorkoutToday = safeWorkouts.some(w => w?.date === todayStr);

  // Calculate Streak safely (based strictly on workouts as per rules)
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const hasWorkout = safeWorkouts.some(w => w?.date === dateStr);

    if (hasWorkout) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (dateStr === todayStr) {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate BMI safely
  const displayWeight = currentWeight > 0 ? currentWeight : "—";
  const heightM = (safeUser.height || 0) / 100;
  const bmi = currentWeight > 0 && heightM > 0 ? (currentWeight / (heightM * heightM)).toFixed(1) : "—";

  // Missions
  const missions = [
    { label: "Complete Workout", done: hasWorkoutToday },
    { label: `Drink ${waterGoal} ml Water`, done: todaysWater >= waterGoal },
    { label: `Burn ${calorieBurnGoal} Calories`, done: totalBurned >= calorieBurnGoal },
    { label: "Reach Protein Goal", done: todaysProtein >= proteinGoal },
    { label: "Complete Today's Challenge", done: false }
  ];

  // Ring Percentages (safe limits 0-100)
  const safePct = (val, max) => Math.max(0, Math.min((val / (max || 1)) * 100, 100));
  const workoutPct = safePct(totalBurned, calorieBurnGoal);
  const waterPct = safePct(todaysWater, waterGoal);
  const proteinPct = safePct(todaysProtein, proteinGoal);
  const caloriesPct = safePct(todaysCalories, 2500);

  // Generate Weekly Burn Safely
  const weeklyBurn = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dStr = format(d, 'yyyy-MM-dd');
    const dayName = format(d, 'EEE');
    const cals = safeWorkouts.filter(w => w?.date === dStr).reduce((acc, curr) => acc + ((curr?.duration || 0) * 8), 0);
    return { day: dayName, calories: cals };
  });

  // Generate Weight Trend Safely
  const weightTrend = currentWeight === 0 ? [] : [
    { date: 'Today', weight: currentWeight },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">

      {/* ======================= */}
      {/* PREMIUM HERO SECTION */}
      {/* ======================= */}
      <div className="relative w-full rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0B1324] via-[#16213E] to-[#0B1324] text-white shadow-2xl border border-white/5 p-6 md:p-8 lg:p-10 flex flex-col gap-8">

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B7FF3C]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#16213E]/80 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 relative z-10">

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{greetingIcon}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {greeting}, <span className="text-[#B7FF3C]">{safeUser.full_name ? safeUser.full_name.split(' ')[0] : (safeUser.name || 'Athlete')}</span>
              </h1>
            </div>
            <p className="text-white/60 font-medium tracking-wide">{format(today, 'EEEE, d MMMM yyyy')}</p>
            <p className="text-white/80 italic mt-2">"{todaysQuote}"</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/workouts" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B7FF3C] text-[#0B1324] font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(183,255,60,0.4)] transition-all">
              <Plus size={18} /> Log Workout
            </Link>
            <Link to="/nutrition" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-medium">
              <Utensils size={18} /> Log Meal
            </Link>
            <Link to="/water" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-medium">
              <Droplets size={18} /> Log Water
            </Link>
          </div>
        </div>

        {/* Hero Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mt-2">

          {/* Mission Card */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-transform">
            <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-[#B7FF3C]">
              Today's Mission
            </h3>
            <div className="flex flex-col gap-3">
              {missions.map((m, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-sm ${m.done ? 'text-white/50' : 'text-white/90'}`}>
                  {m.done ? (
                    <CheckCircle2 size={18} className="text-[#B7FF3C]" />
                  ) : (
                    <Circle size={18} className="text-white/30" />
                  )}
                  <span className={m.done ? 'line-through' : ''}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Rings & Live Summary */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Live Summary Chips */}
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider"><Flame size={14} className="text-orange-400" /> Burned</div>
                <div className="text-2xl font-bold">{totalBurned} <span className="text-xs text-white/50 font-normal">kcal</span></div>
              </div>
              <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider"><Droplets size={14} className="text-blue-400" /> Water</div>
                <div className="text-2xl font-bold">{todaysWater} <span className="text-xs text-white/50 font-normal">ml</span></div>
              </div>
              <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider"><Scale size={14} className="text-emerald-400" /> Weight</div>
                <div className="text-2xl font-bold">{displayWeight} {currentWeight > 0 && <span className="text-xs text-white/50 font-normal">kg</span>}</div>
              </div>
              <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider"><Activity size={14} className="text-purple-400" /> BMI</div>
                <div className={`font-bold ${bmi === '—' ? 'text-2xl text-yellow-400' : 'text-2xl'}`}>{bmi}</div>
              </div>
              <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider"><Target size={14} className="text-indigo-400" /> Goal</div>
                <div className={`font-bold ${!safeUser.fitness_goal ? 'text-sm text-yellow-400 mt-1' : 'text-lg leading-tight'}`}>{safeUser.fitness_goal || 'Complete your profile'}</div>
              </div>
            </div>

            {/* Rings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex justify-around items-center">
              <ProgressRing radius={40} stroke={6} progress={workoutPct} colorClass="text-orange-500" icon={Flame} label="Move" />
              <ProgressRing radius={40} stroke={6} progress={waterPct} colorClass="text-blue-500" icon={Droplets} label="Water" />
              <ProgressRing radius={40} stroke={6} progress={proteinPct} colorClass="text-rose-500" icon={Utensils} label="Protein" />
              <ProgressRing radius={40} stroke={6} progress={caloriesPct} colorClass="text-[#B7FF3C]" icon={Activity} label="Energy" />
            </div>

          </div>

          {/* Right Column: Widgets */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-5 flex items-center justify-between hover:border-blue-400/40 transition-colors">
              <div>
                <div className="text-3xl font-bold flex items-center gap-2">27°C <CloudSun size={28} className="text-yellow-400" /></div>
                <div className="text-sm font-medium mt-1">Ahmedabad</div>
                <div className="text-xs text-blue-200 mt-2 opacity-80">Perfect for Outdoor Workout</div>
              </div>
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-5 flex items-center gap-4 hover:border-orange-500/40 transition-colors">
              <div className="bg-orange-500/20 p-3 rounded-full animate-flicker">
                <Flame size={24} className="text-orange-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-orange-400">{streak} Day Streak</div>
                <div className="text-xs text-orange-200/80">
                  {streak === 0 ? "Start logging to build your streak!" : "You haven't missed a day!"}
                </div>
              </div>
            </div>

            {/* text message */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:bg-white/10 transition-colors">
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
                <Bot size={80} />
              </div>
              <p className="text-xs text-white/80 leading-relaxed pr-6 relative z-10">
{safeWorkouts.length === 0 ?"Start tracking your fitness journey to unlock personalized insights.":
                "Stay consistent with your workouts, nutrition, and hydration to achieve your fitness goals."}</p>
            </div>

          </div>
        </div>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <XPCard />
        <AchievementsPreview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl">Weekly Energy Expenditure</h2>
          {safeWorkouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-[var(--color-text-muted)] gap-3">
              <Dumbbell size={48} className="opacity-20" />
              <p className="text-center font-medium">No workout history yet.<br />Start your first workout to unlock your analytics.</p>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyBurn} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'var(--color-bg-panel)', border: '1px solid #334155' }}
                  />
                  <Bar dataKey="calories" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        <Panel className="flex flex-col gap-6">
          <h2 className="text-xl">Nutrition Progress</h2>
          <div className="flex flex-col gap-6 flex-1 justify-center">
            <ProgressBar label="Calories" progress={todaysCalories} max={2500} colorClass="bg-amber-500" heightClass="h-3" />
            <ProgressBar label="Protein (g)" progress={todaysProtein} max={160} colorClass="bg-rose-500" heightClass="h-3" />
            <ProgressBar label="Carbs (g)" progress={todaysCarbs} max={250} colorClass="bg-emerald-500" heightClass="h-3" />
            <ProgressBar label="Fat (g)" progress={todaysFat} max={70} colorClass="bg-sky-500" heightClass="h-3" />
          </div>
        </Panel>
      </div>

      <Panel className="flex flex-col gap-4">
        <h2 className="text-xl">Weight Trend (Last 30 Days)</h2>
        {weightTrend.length <= 1 && currentWeight === 0 ? (
          <div className="flex flex-col items-center justify-center h-[250px] text-[var(--color-text-muted)] gap-3">
            <Scale size={48} className="opacity-20" />
            <p className="text-center font-medium">No weight history available.<br />Complete your profile to track progress.</p>
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-panel)', border: '1px solid #334155' }}
                />
                <Area type="monotone" dataKey="weight" stroke="var(--color-accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Panel>

      {/* ======================= */}
      {/* AI & MACHINE LEARNING CENTER */}
      {/* ======================= */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mt-4 text-[#B7FF3C]">
          <BrainCircuit />Machine Learning Center
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prediction Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black backdrop-blur-xl border border-purple-500/30 p-6 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  Weight Prediction
                </h3>
                <p className="text-purple-300/80 text-sm flex items-center gap-1 mt-1">
                  <Sparkles size={14} /> Powered by Machine Learning
                </p>
              </div>
              {prediction?.confidence && (
                <div className="bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Target size={12} /> {prediction.confidence}% Confidence
                </div>
              )}
            </div>

            {aiLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin text-purple-400" size={32} />
              </div>
            ) : safeWorkouts.length < 7 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                <div className="bg-purple-500/20 p-3 rounded-full mb-3">
                  <Target className="text-purple-400" size={24} />
                </div>
                <p className="text-white/80 font-medium">Add at least 7 workout records to generate prediction.</p>
                <p className="text-white/40 text-xs mt-1">Need more data for the ML model</p>
              </div>
            ) : prediction ? (
              <div className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-3 gap-4 bg-black/40 rounded-xl p-4 border border-white/5">
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-white/60 text-xs font-semibold uppercase">Current</span>
                    <span className="text-2xl font-bold text-white">{prediction.current_weight} <span className="text-sm font-normal text-white/50">kg</span></span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-white/60 text-xs font-semibold uppercase">In 30 Days</span>
                    <span className="text-sm font-bold text-purple-400 px-2 py-1 bg-purple-500/20 rounded">
                      {prediction.trend}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-white/60 text-xs font-semibold uppercase">Predicted</span>
                    <span className="text-2xl font-bold text-[#B7FF3C]">{prediction.predicted_weight} <span className="text-sm font-normal text-white/50">kg</span></span>
                  </div>
                </div>

                <div className="h-[150px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { day: 'Today', weight: prediction.current_weight },
                      { day: '7 Days', weight: Number((prediction.current_weight + (prediction.predicted_weight - prediction.current_weight) * 0.25).toFixed(1)) },
                      { day: '15 Days', weight: Number((prediction.current_weight + (prediction.predicted_weight - prediction.current_weight) * 0.5).toFixed(1)) },
                      { day: '30 Days', weight: prediction.predicted_weight }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.5)" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#B7FF3C' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#B7FF3C"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#0B1324', stroke: '#B7FF3C', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#B7FF3C' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">Model data unavailable</div>
            )}
          </div>

          {/* Recommendation Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/40 via-teal-900/20 to-black backdrop-blur-xl border border-emerald-500/30 p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/50 transition-all group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>

            <div className="mb-6 relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                Today's Recommendation
              </h3>
              <p className="text-emerald-300/80 text-sm mt-1">Smart workout engine based on your goals & history.</p>
            </div>

            {aiLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin text-emerald-400" size={32} />
              </div>
            ) : recommendation ? (
              <div className="flex flex-col gap-5 relative z-10 h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-2xl font-black text-[#B7FF3C] tracking-tight">{recommendation.plan}</h4>
                    <p className="text-white/70 text-sm mt-1">{recommendation.reason}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-full font-semibold">
                    {recommendation.difficulty}
                  </span>
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-full font-semibold">
                    ⏱ {recommendation.duration}
                  </span>
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-full font-semibold">
                    🎯 Focus: {recommendation.focus}
                  </span>
                </div>

                <div className="mt-2">
                  <h5 className="text-white/60 text-xs font-bold uppercase mb-3 tracking-wider">Suggested Exercises</h5>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.exercises?.map((ex, i) => (
                      <span key={i} className="bg-white/5 border border-white/10 text-white/90 text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-default">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Link to="/workouts" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-500/25">
                    <Play size={18} fill="currentColor" /> Start Workout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">Recommendation unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardErrorBoundary>
      <DashboardContent />
    </DashboardErrorBoundary>
  );
}
