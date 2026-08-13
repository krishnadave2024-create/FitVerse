import React, { useState, useMemo } from 'react';
import { exerciseLibrary } from '../store/mockData';
import { muscleInfo } from '../store/muscleData';
import { Panel } from '../components/ui/Panel';
import { TextInput, SelectInput } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Search, X, Video, Info, Activity, Flame, Clock } from 'lucide-react';
import { ExerciseVideo } from '../components/exercises/ExerciseVideo';
import { BodyMap } from '../components/exercises/BodyMap';

export default function Exercises() {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const equipments = [...new Set(exerciseLibrary.map(ex => ex.equipment))].filter(Boolean).sort();
  const categories = [...new Set(exerciseLibrary.map(ex => ex.category))].filter(Boolean).sort();
  const muscleGroups = [...new Set(exerciseLibrary.map(ex => ex.muscle))].filter(Boolean).sort();

  const filteredExercises = useMemo(() => {
    return exerciseLibrary.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchesMuscleMap = selectedMuscle ? ex.muscle === selectedMuscle : true;
      const matchesDifficulty = difficultyFilter ? ex.difficulty === difficultyFilter : true;
      const matchesEquipment = equipmentFilter ? ex.equipment === equipmentFilter : true;
      const matchesCategory = categoryFilter ? ex.category === categoryFilter : true;
      return matchesSearch && matchesMuscleMap && matchesDifficulty && matchesEquipment && matchesCategory;
    });
  }, [search, selectedMuscle, difficultyFilter, equipmentFilter, categoryFilter]);

  const closeVideoModal = (e) => {
    e.stopPropagation();
    setIsVideoModalOpen(false);
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
    setIsVideoModalOpen(false);
  };

  const openVideo = (exercise, e) => {
    e.stopPropagation();
    setSelectedExercise(exercise);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 relative animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]">
          Interactive Muscle Map
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">Select a muscle group or search exercises directly.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <Panel className="flex-1 min-h-[500px] flex items-center justify-center border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(183,255,60,0.05)]">
            <BodyMap 
              selectedMuscle={selectedMuscle} 
              onSelectMuscle={(m) => {
                setSelectedMuscle(m);
                setCategoryFilter('');
              }} 
            />
          </Panel>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {selectedMuscle && muscleInfo[selectedMuscle] && (
            <Panel className="bg-[var(--color-bg-base)]/50 border-[var(--color-primary)]/50 shadow-[0_0_20px_rgba(183,255,60,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h2 className="text-2xl font-black text-[var(--color-text-main)] uppercase tracking-wider flex items-center gap-2">
                  <Activity className="text-[var(--color-primary)]" />
                  {selectedMuscle}
                </h2>
                <button 
                  onClick={() => setSelectedMuscle(null)}
                  className="text-[var(--color-text-muted)] hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-widest mb-1">Primary Function</h4>
                    <p className="text-sm text-[var(--color-text-main)]">{muscleInfo[selectedMuscle].primaryFunction}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-widest mb-1">Secondary Muscles</h4>
                    <div className="flex flex-wrap gap-1">
                      {muscleInfo[selectedMuscle].secondaryMuscles.map(m => (
                        <span key={m} className="text-xs bg-[var(--color-bg-panel)] px-2 py-0.5 rounded border border-[var(--color-border)]">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-widest mb-1">Warm-up Tips</h4>
                    <p className="text-sm text-[var(--color-text-main)]">{muscleInfo[selectedMuscle].warmup}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-widest mb-1">Recovery</h4>
                    <p className="text-sm text-[var(--color-text-main)]">{muscleInfo[selectedMuscle].recovery}</p>
                  </div>
                </div>
              </div>
            </Panel>
          )}

          <div className="flex flex-col gap-4">
            <div className="relative">
              <TextInput 
                placeholder="Search exercises by name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 text-lg rounded-xl shadow-inner bg-[var(--color-bg-base)]"
              />
              <Search className="absolute left-4 top-3.5 text-[var(--color-primary)]" size={20} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-auto flex-1 min-w-[140px]">
                <SelectInput 
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    if(e.target.value === 'Yoga' || e.target.value === 'Flexibility') {
                      setSelectedMuscle(null);
                    }
                  }}
                  options={[
                    { label: 'Any Type', value: '' },
                    ...categories.map(c => ({ label: c, value: c }))
                  ]}
                />
              </div>
              <div className="w-full md:w-auto flex-1 min-w-[140px]">
                <SelectInput 
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  options={[
                    { label: 'Any Difficulty', value: '' },
                    ...difficulties.map(d => ({ label: d, value: d }))
                  ]}
                />
              </div>
              <div className="w-full md:w-auto flex-1 min-w-[140px]">
                <SelectInput 
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  options={[
                    { label: 'Any Equipment', value: '' },
                    ...equipments.map(e => ({ label: e, value: e }))
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <h3 className="text-lg font-bold">
              {selectedMuscle ? `${selectedMuscle} Exercises` : categoryFilter ? `${categoryFilter} Exercises` : 'All Exercises'}
            </h3>
            <span className="text-sm text-[var(--color-text-muted)] font-medium bg-[var(--color-bg-panel)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              {filteredExercises.length} found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExercises.map(ex => (
              <Panel 
                key={ex.id} 
                className="group flex flex-col gap-4 cursor-pointer hover:border-[var(--color-primary)]/50 transition-all hover:shadow-[0_4px_20px_rgba(183,255,60,0.1)] relative overflow-hidden"
                onClick={() => setSelectedExercise(ex)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-panel)] to-[var(--color-bg-base)] opacity-50 pointer-events-none" />

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-lg text-[var(--color-text-main)] font-bold group-hover:text-[var(--color-primary)] transition-colors">{ex.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{ex.muscle} • {ex.category}</p>
                  </div>
                  <Tag variant={ex.difficulty === 'Beginner' ? 'success' : ex.difficulty === 'Advanced' ? 'ember' : 'blue'}>
                    {ex.difficulty}
                  </Tag>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 relative z-10">
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] font-medium">
                    <Info size={14} className="text-[var(--color-text-muted)]" />
                    {ex.equipment}
                  </div>
                </div>

                <div className="flex mt-2 relative z-10 w-full">
                  <Button 
                    variant="primary" 
                    className="w-full text-sm py-2.5 font-bold"
                    icon={Video}
                    onClick={(e) => openVideo(ex, e)}
                  >
                    Watch Video
                  </Button>
                </div>
              </Panel>
            ))}
            
            {filteredExercises.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-[var(--color-bg-panel)] rounded-2xl border border-dashed border-[var(--color-border)]">
                <Search size={32} className="text-[var(--color-text-muted)] mb-3" />
                <h3 className="text-lg font-bold text-[var(--color-text-main)]">No exercises found</h3>
                <p className="text-[var(--color-text-muted)]">Try adjusting your filters or search term.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearch('');
                  setSelectedMuscle(null);
                  setDifficultyFilter('');
                  setEquipmentFilter('');
                  setCategoryFilter('');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedExercise && !isVideoModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeExerciseModal}>
          <Panel 
            className="w-full max-w-lg relative animate-in fade-in zoom-in duration-200 border border-[var(--color-primary)]/50 shadow-2xl max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] transition-colors"
              onClick={closeExerciseModal}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-2 pr-8">{selectedExercise.name}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Tag variant="primary">{selectedExercise.category}</Tag>
              <Tag>{selectedExercise.muscle}</Tag>
              <Tag>{selectedExercise.equipment}</Tag>
              <Tag variant={selectedExercise.difficulty === 'Beginner' ? 'success' : selectedExercise.difficulty === 'Advanced' ? 'ember' : 'blue'}>
                {selectedExercise.difficulty}
              </Tag>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Instructions</h4>
                <p className="text-[var(--color-text-main)] leading-relaxed bg-[var(--color-bg-base)] p-4 rounded-xl border border-[var(--color-border)]">
                  {selectedExercise.instructions || "No instructions provided."}
                </p>
              </div>

              {selectedExercise.benefits && (
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Benefits</h4>
                  <p className="text-[var(--color-text-main)] leading-relaxed bg-[var(--color-bg-base)] p-4 rounded-xl border border-[var(--color-border)]">
                    {selectedExercise.benefits}
                  </p>
                </div>
              )}

              {selectedExercise.recoveryTips && (
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Recovery Tips</h4>
                  <p className="text-[var(--color-text-main)] leading-relaxed bg-[var(--color-bg-base)] p-4 rounded-xl border border-[var(--color-border)]">
                    {selectedExercise.recoveryTips}
                  </p>
                </div>
              )}

              {selectedExercise.precautions && (
                <div>
                  <h4 className="text-[var(--color-accent-red)] font-semibold text-sm uppercase tracking-wider mb-2">Precautions</h4>
                  <p className="text-[var(--color-text-main)] leading-relaxed bg-[var(--color-accent-red)]/10 p-4 rounded-xl border border-[var(--color-accent-red)]/30">
                    {selectedExercise.precautions}
                  </p>
                </div>
              )}
              
              <div className="pt-2">
                <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-3">🎥 Exercise Demonstration</h4>
                <Button 
                  variant="primary" 
                  icon={Video} 
                  onClick={() => setIsVideoModalOpen(true)}
                  fullWidth
                >
                  Watch Video Tutorial
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      )}

      {isVideoModalOpen && selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeVideoModal}>
          <div 
            className="w-full max-w-4xl relative animate-in zoom-in-95 duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 right-0 text-white hover:text-[var(--color-accent-red)] transition-colors flex items-center gap-2"
              onClick={closeVideoModal}
            >
              <span className="text-sm font-semibold uppercase tracking-wider">Close</span>
              <X size={24} />
            </button>
            
            <ExerciseVideo exerciseName={selectedExercise.name} />
          </div>
        </div>
      )}
    </div>
  );
}
