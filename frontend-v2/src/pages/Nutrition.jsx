import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { foodLibrary } from '../store/mockData';
import { Panel } from '../components/ui/Panel';
import { ProgressBar } from '../components/ui/ProgressBar';
import { TextInput, SelectInput } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function Nutrition() {
  const { meals, addMeal, removeMeal } = useStore();
  const [filterDate, setFilterDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  const [newMeal, setNewMeal] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'Breakfast',
    foodId: foodLibrary[0].id,
    servings: 1,
    customName: '',
    customCalories: 0,
    customProtein: 0,
    customCarbs: 0,
    customFat: 0,
  });

  const handleAdd = (e) => {
    e.preventDefault();
    
    if (newMeal.foodId === 'other') {
      if (!newMeal.customName) return;
      addMeal({
        id: uuidv4(),
        date: newMeal.date,
        type: newMeal.type,
        name: newMeal.customName,
        calories: Math.round(newMeal.customCalories * newMeal.servings),
        protein: Math.round(newMeal.customProtein * newMeal.servings),
        carbs: Math.round(newMeal.customCarbs * newMeal.servings),
        fat: Math.round(newMeal.customFat * newMeal.servings),
      });
      return;
    }

    const food = foodLibrary.find(f => f.id === newMeal.foodId);
    if (!food) return;

    addMeal({
      id: uuidv4(),
      date: newMeal.date,
      type: newMeal.type,
      name: food.name,
      calories: Math.round(food.calories * newMeal.servings),
      protein: Math.round(food.protein * newMeal.servings),
      carbs: Math.round(food.carbs * newMeal.servings),
      fat: Math.round(food.fat * newMeal.servings),
    });
  };

  const filteredMeals = meals.filter(m => m.date === filterDate);
  const totalCal = filteredMeals.reduce((acc, curr) => acc + curr.calories, 0);
  const totalPro = filteredMeals.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarb = filteredMeals.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFat = filteredMeals.reduce((acc, curr) => acc + curr.fat, 0);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 text-[var(--color-primary)]">Nutrition</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Fuel your body. Track your macros.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl">Daily Summary</h2>
            <ProgressBar label="Calories (2500 goal)" progress={totalCal} max={2500} colorClass="bg-amber-500" />
            <ProgressBar label="Protein (160g)" progress={totalPro} max={160} colorClass="bg-rose-500" />
            <ProgressBar label="Carbs (250g)" progress={totalCarb} max={250} colorClass="bg-emerald-500" />
            <ProgressBar label="Fat (70g)" progress={totalFat} max={70} colorClass="bg-sky-500" />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <h2 className="text-xl mb-4">Add Food</h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <TextInput 
                label="Date" 
                type="date" 
                value={newMeal.date} 
                onChange={(e) => setNewMeal({...newMeal, date: e.target.value})} 
                required 
              />
              <SelectInput 
                label="Meal Type" 
                value={newMeal.type} 
                onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                options={mealTypes.map(t => ({ label: t, value: t }))}
              />
              <SelectInput 
                label="Food" 
                value={newMeal.foodId} 
                onChange={(e) => setNewMeal({...newMeal, foodId: e.target.value})}
                options={[...foodLibrary.map(f => ({ label: f.name, value: f.id })), { label: 'Other (Custom)', value: 'other' }]}
              />
              
              {newMeal.foodId === 'other' && (
                <div className="flex flex-col gap-4 border-l-2 border-[var(--color-primary)] pl-4 ml-2 my-2">
                  <TextInput 
                    label="Food Name" 
                    value={newMeal.customName} 
                    onChange={(e) => setNewMeal({...newMeal, customName: e.target.value})} 
                    required={newMeal.foodId === 'other'} 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Calories" type="number" value={newMeal.customCalories} onChange={(e) => setNewMeal({...newMeal, customCalories: Number(e.target.value)})} required />
                    <TextInput label="Protein (g)" type="number" value={newMeal.customProtein} onChange={(e) => setNewMeal({...newMeal, customProtein: Number(e.target.value)})} required />
                    <TextInput label="Carbs (g)" type="number" value={newMeal.customCarbs} onChange={(e) => setNewMeal({...newMeal, customCarbs: Number(e.target.value)})} required />
                    <TextInput label="Fat (g)" type="number" value={newMeal.customFat} onChange={(e) => setNewMeal({...newMeal, customFat: Number(e.target.value)})} required />
                  </div>
                </div>
              )}

              <TextInput 
                label="Servings (Multiplier)" 
                type="number" 
                step="0.1" 
                value={newMeal.servings} 
                onChange={(e) => setNewMeal({...newMeal, servings: Number(e.target.value)})} 
                required 
              />
              <Button type="submit" variant="ember" className="mt-2" icon={Plus}>Add Meal</Button>
            </form>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl">Food Diary</h2>
            <div className="w-full md:w-48">
              <TextInput 
                type="date" 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {mealTypes.map(type => {
              const typeMeals = filteredMeals.filter(m => m.type === type);
              if (typeMeals.length === 0) return null;
              
              const typeCals = typeMeals.reduce((acc, curr) => acc + curr.calories, 0);

              return (
                <div key={type} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                    <h3 className="text-lg font-semibold text-[var(--color-text-main)]">{type}</h3>
                    <span className="text-[var(--color-primary)] font-semibold">{typeCals} kcal</span>
                  </div>
                  
                  {typeMeals.map(meal => (
                    <div key={meal.id} className="flex justify-between items-center py-2 hover:bg-[var(--color-bg-panel-hover)]/30 px-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Utensils size={18} className="text-[var(--color-text-muted)]" />
                        <div>
                          <p className="font-medium text-slate-200">{meal.name}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[var(--color-text-muted)] font-semibold">{meal.calories}</span>
                        <button onClick={() => removeMeal(meal.id)} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            
            {filteredMeals.length === 0 && (
              <div className="py-12 text-center text-[var(--color-text-muted)]">
                No meals logged for this date.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
