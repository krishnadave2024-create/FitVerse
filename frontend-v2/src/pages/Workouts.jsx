import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { exerciseLibrary } from '../store/mockData';
import { Panel } from '../components/ui/Panel';
import { TextInput, SelectInput } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Dumbbell, Flame, ActivitySquare } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export default function Workouts() {
  const { workouts, addWorkout, removeWorkout } = useStore();
  const [filterDate, setFilterDate] = useState('');
  
  const [newWorkout, setNewWorkout] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    exercise: exerciseLibrary[0]?.name || '',
    sets: 3,
    reps: 10,
    weight: 20,
    duration: 15,
    customName: '',
    calories: 0,
    notes: ''
  });

  const isCustom = newWorkout.exercise === '➕ Custom Activity';

  const handleAdd = (e) => {
    e.preventDefault();
    if (isCustom) {
      if (!newWorkout.customName) return;
      addWorkout({
        id: uuidv4(),
        date: newWorkout.date,
        exercise: newWorkout.customName,
        isCustom: true,
        duration: newWorkout.duration,
        calories: newWorkout.calories || (newWorkout.duration * 8),
        notes: newWorkout.notes,
        sets: 0,
        reps: 0,
        weight: 0
      });
    } else {
      addWorkout({
        id: uuidv4(),
        date: newWorkout.date,
        exercise: newWorkout.exercise,
        isCustom: false,
        sets: newWorkout.sets,
        reps: newWorkout.reps,
        weight: newWorkout.weight,
        duration: newWorkout.duration,
        calories: newWorkout.duration * 8
      });
    }
    
    // reset some fields
    setNewWorkout(prev => ({
      ...prev,
      customName: '',
      notes: '',
      calories: 0
    }));
  };

  const filteredWorkouts = workouts.filter(w => !filterDate || w.date === filterDate);

  const getActivityBadge = (workout) => {
    const name = workout.exercise.toLowerCase();
    
    let emoji = '🏋️'; // default strength
    let label = 'Strength';
    let color = 'bg-blue-500/20 text-blue-400 border-blue-500/30';

    if (name.includes('yoga')) {
      emoji = '🧘'; label = 'Yoga'; color = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    } else if (name.includes('run') || name.includes('walk') || name.includes('cardio') || name.includes('treadmill')) {
      emoji = '🏃'; label = 'Cardio'; color = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    } else if (name.includes('flexibility') || name.includes('stretch')) {
      emoji = '🤸'; label = 'Flexibility'; color = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    } else if (name.includes('swim')) {
      emoji = '🏊'; label = 'Swimming'; color = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    } else if (name.includes('sport') || name.includes('soccer') || name.includes('basket') || name.includes('tennis')) {
      emoji = '⚽'; label = 'Sports'; color = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    } else if (workout.isCustom) {
      emoji = '✨'; label = 'Activity'; color = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    } else {
      // Look up in library to see if it's Yoga/Flexibility etc
      const libEx = exerciseLibrary.find(e => e.name === workout.exercise);
      if (libEx) {
        if (libEx.category === 'Yoga') { emoji = '🧘'; label = 'Yoga'; color = 'bg-purple-500/20 text-purple-400 border-purple-500/30'; }
        if (libEx.category === 'Flexibility') { emoji = '🤸'; label = 'Flexibility'; color = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'; }
        if (libEx.category === 'Cardio') { emoji = '🏃'; label = 'Cardio'; color = 'bg-orange-500/20 text-orange-400 border-orange-500/30'; }
      }
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-semibold ${color}`}>
        {emoji} {label}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]">Workouts</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Log your sessions and track your gains.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-1 h-fit border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(183,255,60,0.05)]">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ActivitySquare className="text-[var(--color-primary)]" /> Log Activity
          </h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <TextInput 
              label="Date" 
              type="date" 
              value={newWorkout.date} 
              onChange={(e) => setNewWorkout({...newWorkout, date: e.target.value})} 
              required 
            />
            
            <SelectInput 
              label="Exercise / Activity" 
              value={newWorkout.exercise} 
              onChange={(e) => setNewWorkout({...newWorkout, exercise: e.target.value})}
              options={[
                ...exerciseLibrary.map(ex => ({ label: ex.name, value: ex.name })),
                { label: '➕ Custom Activity', value: '➕ Custom Activity' }
              ]}
            />

            {isCustom ? (
              <>
                <TextInput 
                  label="Activity Name (e.g. Yoga, Tennis)" 
                  type="text" 
                  value={newWorkout.customName} 
                  onChange={(e) => setNewWorkout({...newWorkout, customName: e.target.value})} 
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextInput 
                    label="Duration (min)" 
                    type="number" 
                    value={newWorkout.duration} 
                    onChange={(e) => setNewWorkout({...newWorkout, duration: Number(e.target.value)})} 
                    required 
                  />
                  <TextInput 
                    label="Calories Burned" 
                    type="number" 
                    value={newWorkout.calories || ''} 
                    onChange={(e) => setNewWorkout({...newWorkout, calories: Number(e.target.value)})} 
                    required 
                  />
                </div>
                <TextInput 
                  label="Notes (Optional)" 
                  type="text" 
                  value={newWorkout.notes} 
                  onChange={(e) => setNewWorkout({...newWorkout, notes: e.target.value})} 
                />
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput 
                    label="Sets" 
                    type="number" 
                    value={newWorkout.sets} 
                    onChange={(e) => setNewWorkout({...newWorkout, sets: Number(e.target.value)})} 
                    required 
                  />
                  <TextInput 
                    label="Reps" 
                    type="number" 
                    value={newWorkout.reps} 
                    onChange={(e) => setNewWorkout({...newWorkout, reps: Number(e.target.value)})} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput 
                    label="Weight (kg)" 
                    type="number" 
                    value={newWorkout.weight} 
                    onChange={(e) => setNewWorkout({...newWorkout, weight: Number(e.target.value)})} 
                    required 
                  />
                  <TextInput 
                    label="Duration (min)" 
                    type="number" 
                    value={newWorkout.duration} 
                    onChange={(e) => setNewWorkout({...newWorkout, duration: Number(e.target.value)})} 
                    required 
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="mt-4 shadow-[0_0_20px_rgba(183,255,60,0.2)] hover:shadow-[0_0_30px_rgba(183,255,60,0.4)]" icon={Plus}>Add to Log</Button>
          </form>
        </Panel>

        <Panel className="lg:col-span-2 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Workout History</h2>
            <div className="w-full md:w-48">
              <TextInput 
                type="date" 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)} 
              />
            </div>
          </div>

          {workouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-muted)] gap-4 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-base)]">
              <Dumbbell size={64} className="opacity-20 text-[var(--color-primary)]" />
              <h3 className="text-xl font-semibold text-[var(--color-text-main)]">No workouts recorded yet</h3>
              <p className="text-center max-w-sm">Start your fitness journey by logging your first workout on the left.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="w-full text-left text-sm text-[var(--color-text-muted)]">
                <thead className="text-xs uppercase bg-[var(--color-bg-base)] text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Activity</th>
                    <th className="px-4 py-4">Type</th>
                    <th className="px-4 py-4 text-center">Volume</th>
                    <th className="px-4 py-4 text-center">Calories</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filteredWorkouts.length > 0 ? filteredWorkouts.map((workout) => (
                    <tr key={workout.id} className="hover:bg-[var(--color-bg-base)]/50 transition-colors group">
                      <td className="px-4 py-4 font-medium">{workout.date}</td>
                      <td className="px-4 py-4 font-bold text-[var(--color-text-main)]">
                        <div className="flex flex-col">
                          <span>{workout.exercise}</span>
                          {workout.notes && <span className="text-xs font-normal text-[var(--color-text-muted)] mt-1">{workout.notes}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {getActivityBadge(workout)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {workout.isCustom || workout.weight === 0 ? (
                          <span className="text-[var(--color-text-muted)]">{workout.duration} min</span>
                        ) : (
                          <span>{workout.sets}x{workout.reps} @ {workout.weight}kg</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[var(--color-accent-orange)] font-bold bg-[var(--color-accent-orange)]/10 px-2 py-1 rounded-md">
                          <Flame size={14} /> {workout.calories} kcal
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button 
                          onClick={() => removeWorkout(workout.id)} 
                          className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-accent-red)]/10 hover:text-[var(--color-accent-red)] transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-12 text-center text-[var(--color-text-muted)]">
                        No workouts logged for this date.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
