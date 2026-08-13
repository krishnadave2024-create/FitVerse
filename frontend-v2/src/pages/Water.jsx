import React from 'react';
import { useStore } from '../store/StoreContext';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Droplet, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function Water() {
  const { water, addWater, removeWater } = useStore();
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const target = 3000;

  const selectedWater = water.filter(w => w.date === selectedDate);
  const totalIntake = selectedWater.reduce((acc, curr) => acc + curr.amount, 0);
  const percentage = Math.min(100, (totalIntake / target) * 100);

  const handleAdd = (amount) => {
    addWater({
      id: uuidv4(),
      date: selectedDate,
      amount,
      timestamp: new Date().toISOString()
    });
  };

  const dDate = new Date(selectedDate);
  const dayOfW = dDate.getDay();
  const diff = dDate.getDate() - dayOfW + (dayOfW === 0 ? -6 : 1);
  const monday = new Date(dDate.setDate(diff));

  const weeklyData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    const dStr = format(d, 'yyyy-MM-dd');
    const dayName = format(d, 'EEE');
    const dayTotal = water.filter(w => w.date === dStr).reduce((acc, curr) => acc + curr.amount, 0);
    return { day: dayName, amount: dayTotal };
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 text-[var(--color-primary)]">Water Intake</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Stay hydrated to maximize performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel className="flex flex-col items-center justify-center py-10 gap-8">
          <div className="flex flex-col items-center gap-2 mb-2 w-full max-w-[200px]">
            <label className="text-sm font-semibold text-[var(--color-text-muted)]">Water Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-primary)] text-center text-lg"
            />
          </div>
          <div className="relative w-64 h-64 rounded-full border-8 border-slate-800 flex items-center justify-center bg-[var(--color-bg-base)]/50 overflow-hidden shadow-inner">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-[var(--color-accent-blue)] transition-all duration-1000 ease-in-out opacity-80"
              style={{ height: `${percentage}%` }}
            />
            <div className="z-10 text-center flex flex-col items-center">
              <Droplet size={32} className={percentage > 50 ? 'text-slate-900' : 'text-[var(--color-accent-blue)]'} />
              <span className={`text-4xl font-heading mt-2 ${percentage > 50 ? 'text-slate-900' : 'text-[var(--color-text-main)]'}`}>
                {totalIntake} <span className="text-xl">ml</span>
              </span>
              <span className={`text-sm ${percentage > 50 ? 'text-slate-800' : 'text-[var(--color-text-muted)]'}`}>
                / {target} ml
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => handleAdd(250)} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring-blue-500">
              +250ml
            </Button>
            <Button onClick={() => handleAdd(500)} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring-blue-500">
              +500ml
            </Button>
            <Button onClick={() => handleAdd(750)} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring-blue-500">
              +750ml
            </Button>
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel>
            <h2 className="text-xl mb-4">Today's Log</h2>
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-2">
              {selectedWater.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map(entry => (
                <div key={entry.id} className="flex justify-between items-center py-2 px-3 bg-[var(--color-bg-panel-hover)]/50 rounded-lg">
                  <div className="flex items-center gap-3 text-[var(--color-text-main)]">
                    <Droplet size={16} className="text-blue-500" />
                    <span className="font-semibold">{entry.amount} ml</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {format(new Date(entry.timestamp), 'HH:mm')}
                    </span>
                    <button onClick={() => removeWater(entry.id)} className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {selectedWater.length === 0 && (
                <p className="text-[var(--color-text-muted)] text-center py-4">No water logged for this date.</p>
              )}
            </div>
          </Panel>

          <Panel className="flex-1">
            <h2 className="text-xl mb-4">Weekly Intake</h2>
            {water.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-[var(--color-text-muted)] gap-3">
                <Droplet size={48} className="opacity-20 text-blue-500" />
                <p className="text-center font-medium">No water data available.<br/>Start logging water intake to view weekly statistics.</p>
              </div>
            ) : (
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: 'var(--color-bg-panel)', border: '1px solid #334155' }}
                    />
                    <Bar dataKey="amount" fill="var(--color-accent-blue)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
