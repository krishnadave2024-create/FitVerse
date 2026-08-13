import React, { useState, useMemo } from 'react';
import { useStore } from '../store/StoreContext';
import { Panel } from '../components/ui/Panel';
import { StatCard } from '../components/ui/StatCard';
import { Target, TrendingDown, Activity, Calendar, Flame } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components/ui/Button';

export default function Progress() {
  const { user, weightHistory, addWeightLog, currentWeight } = useStore();
  const [logDate, setLogDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [logWeight, setLogWeight] = useState('');

  const sortedHistory = [...(weightHistory || [])].sort((a,b) => new Date(b.date) - new Date(a.date));
  const startingWeight = user?.current_weight || (sortedHistory.length > 0 ? sortedHistory[sortedHistory.length - 1].weight : 0);
  const targetWeight = user?.target_weight || 0;
  
  let totalChange = 0;
  if (currentWeight > 0 && startingWeight > 0) {
    totalChange = currentWeight - startingWeight;
  }

  const weightTrend = [...sortedHistory].reverse();

  const handleSaveWeight = (e) => {
    e.preventDefault();
    if (!logWeight || isNaN(logWeight)) return;
    addWeightLog({
      id: uuidv4(),
      date: logDate,
      weight: parseFloat(logWeight)
    });
    setLogWeight('');
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]">Progress Analytics</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Visualize your hard work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Starting Weight" value={startingWeight === 0 ? "—" : `${startingWeight}kg`} icon={Calendar} colorClass="text-[var(--color-text-muted)]" />
        <StatCard title="Current Weight" value={currentWeight === 0 ? "—" : `${currentWeight}kg`} icon={Activity} />
        <StatCard title="Target Weight" value={targetWeight === 0 ? "—" : `${targetWeight}kg`} icon={Target} colorClass="text-[var(--color-accent-blue)]" />
        <StatCard 
          title="Total Change" 
          value={startingWeight === 0 ? "—" : `${totalChange > 0 ? '+' : ''}${totalChange.toFixed(1)}kg`} 
          icon={TrendingDown} 
          colorClass={totalChange <= 0 ? 'text-emerald-500' : 'text-red-500'} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weight Trend */}
        <Panel className="flex flex-col gap-4 h-[400px] border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(183,255,60,0.05)]">
          <h2 className="text-xl font-bold flex items-center gap-2"><Activity className="text-[var(--color-accent-blue)]"/> Weight Trend</h2>
          {weightTrend.length === 0 && currentWeight === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] gap-3 bg-[var(--color-bg-base)] rounded-xl border border-dashed border-[var(--color-border)]">
              <Activity size={48} className="opacity-20 text-[var(--color-accent-blue)]" />
              <p className="text-center font-medium">No weight history available.<br/>Add your first weight entry to start tracking.</p>
            </div>
          ) : (
            <div className="flex-1 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWeightProg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-panel)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="var(--color-accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeightProg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        {/* Weight Log Form */}
        <Panel className="flex flex-col gap-4 h-[400px] border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(183,255,60,0.05)]">
          <h2 className="text-xl font-bold flex items-center gap-2"><Target className="text-[var(--color-primary)]"/> Weight Log</h2>
          <form onSubmit={handleSaveWeight} className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Select Date</label>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={logWeight}
                onChange={(e) => setLogWeight(e.target.value)}
                placeholder="e.g. 68.5"
                className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Save Weight
            </Button>
          </form>
        </Panel>

      </div>
    </div>
  );
}
