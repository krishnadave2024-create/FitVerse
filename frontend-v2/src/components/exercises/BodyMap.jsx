import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

const FRONT_MUSCLES = [
  { id: 'Chest', path: 'M40,30 Q50,35 60,30 L60,45 Q50,50 40,45 Z' },
  { id: 'Shoulders', path: 'M30,25 Q35,20 40,30 L35,40 Z M70,25 Q65,20 60,30 L65,40 Z' },
  { id: 'Biceps', path: 'M30,40 Q25,50 28,60 L35,55 Z M70,40 Q75,50 72,60 L65,55 Z' },
  { id: 'Forearms', path: 'M25,65 Q20,80 25,90 L30,85 Z M75,65 Q80,80 75,90 L70,85 Z' },
  { id: 'Abs', path: 'M45,47 L55,47 L55,65 L45,65 Z' },
  { id: 'Obliques', path: 'M38,47 L45,47 L45,65 L38,60 Z M62,47 L55,47 L55,65 L62,60 Z' },
  { id: 'Quadriceps', path: 'M40,70 L48,70 L48,100 L42,100 Z M60,70 L52,70 L52,100 L58,100 Z' },
  { id: 'Hip Flexors', path: 'M38,66 L45,66 L45,70 L38,70 Z M62,66 L55,66 L55,70 L62,70 Z' }
];

const BACK_MUSCLES = [
  { id: 'Traps', path: 'M45,15 L55,15 L60,25 L40,25 Z' },
  { id: 'Lats', path: 'M40,35 L60,35 L55,55 L45,55 Z' },
  { id: 'Rear Delts', path: 'M30,25 Q35,20 40,25 L35,35 Z M70,25 Q65,20 60,25 L65,35 Z' },
  { id: 'Triceps', path: 'M30,40 Q25,50 28,60 L35,55 Z M70,40 Q75,50 72,60 L65,55 Z' },
  { id: 'Lower Back', path: 'M45,55 L55,55 L58,65 L42,65 Z' },
  { id: 'Glutes', path: 'M42,65 L58,65 L60,75 L40,75 Z' },
  { id: 'Hamstrings', path: 'M40,75 L48,75 L48,100 L42,100 Z M60,75 L52,75 L52,100 L58,100 Z' },
  { id: 'Calves', path: 'M42,105 L48,105 L48,130 L44,130 Z M58,105 L52,105 L52,130 L56,130 Z' }
];

export function BodyMap({ selectedMuscle, onSelectMuscle }) {
  const [view, setView] = useState('front');

  const toggleView = () => {
    setView(v => v === 'front' ? 'back' : 'front');
    onSelectMuscle(null); // Clear selection when flipping
  };

  const activeMuscles = view === 'front' ? FRONT_MUSCLES : BACK_MUSCLES;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full p-4">
      
    
      <div className="flex bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-full p-1 w-48 shadow-lg">
        <button
          onClick={() => { setView('front'); onSelectMuscle(null); }}
          className={`flex-1 text-sm font-bold py-2 rounded-full transition-colors ${view === 'front' ? 'bg-[var(--color-primary)] text-black' : 'text-[var(--color-text-muted)] hover:text-white'}`}
        >
          FRONT
        </button>
        <button
          onClick={() => { setView('back'); onSelectMuscle(null); }}
          className={`flex-1 text-sm font-bold py-2 rounded-full transition-colors ${view === 'back' ? 'bg-[var(--color-primary)] text-black' : 'text-[var(--color-text-muted)] hover:text-white'}`}
        >
          BACK
        </button>
      </div>

      <button 
        onClick={toggleView}
        className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mt-2"
      >
        <RefreshCcw size={14} /> Flip Figure
      </button>

   
      <div className="relative w-full max-w-[300px] aspect-[1/2] mx-auto mt-4">
        <svg 
          viewBox="0 0 100 150" 
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 20px rgba(183,255,60,0.05))' }}
        >
          
          <path 
            d="M50,5 Q55,5 55,12 Q55,18 50,18 Q45,18 45,12 Q45,5 50,5 Z M35,20 L65,20 L75,60 L70,90 L60,70 L55,100 L55,140 L45,140 L45,100 L40,70 L30,90 L25,60 Z"
            fill="var(--color-bg-base)"
            stroke="var(--color-border)"
            strokeWidth="1"
            className="opacity-50"
          />
          

          {activeMuscles.map(muscle => {
            const isSelected = selectedMuscle === muscle.id;
            const isDimmed = selectedMuscle && !isSelected;
            
            return (
              <path
                key={muscle.id}
                d={muscle.path}
                className={`
                  cursor-pointer transition-all duration-300
                  ${isSelected ? 'fill-[var(--color-primary)] stroke-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(183,255,60,0.8)] z-10' : 'fill-[var(--color-bg-panel)] stroke-[var(--color-border)] hover:fill-[var(--color-primary)]/50'}
                  ${isDimmed ? 'opacity-30' : 'opacity-100'}
                `}
                strokeWidth="0.5"
                onClick={() => onSelectMuscle(isSelected ? null : muscle.id)}
              >
                <title>{muscle.id}</title>
              </path>
            );
          })}
        </svg>

        
        {!selectedMuscle && (
          <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none animate-bounce">
            <span className="bg-[var(--color-bg-base)]/80 backdrop-blur text-[var(--color-text-muted)] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">
              Click a muscle
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
