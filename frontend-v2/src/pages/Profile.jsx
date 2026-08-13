import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useStore } from '../store/StoreContext';
import { Panel } from '../components/ui/Panel';
import { TextInput, SelectInput } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Save, User } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export default function Profile() {
  const { user, setUser, currentWeight } = useStore();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    age: '',
    height: '',
    current_weight: '',
    target_weight: '',
    gender: 'Male',
    fitness_goal: 'Maintain Weight',
    activity_level: 'Light',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/accounts/profile/');
        setFormData({
          full_name: res.data.full_name || '',
          email: res.data.email || '',
          age: res.data.age || '',
          height: res.data.height || '',
          current_weight: res.data.current_weight || '',
          target_weight: res.data.target_weight || '',
          gender: res.data.gender || 'Male',
          fitness_goal: res.data.fitness_goal || 'Maintain Weight',
          activity_level: res.data.activity_level || 'Light',
        });
        setUser(res.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Keep form data synced with the centralized currentWeight if it exists
  useEffect(() => {
    if (currentWeight > 0) {
      setFormData(prev => ({ ...prev, current_weight: currentWeight }));
    }
  }, [currentWeight]);

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const bmi = calculateBMI(currentWeight > 0 ? currentWeight : formData.current_weight, formData.height);
  const bmiCategory = getBMICategory(bmi);
  const distanceToTarget = Math.abs((currentWeight > 0 ? currentWeight : (formData.current_weight || 0)) - (formData.target_weight || 0)).toFixed(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put('/accounts/profile/', formData);
      setUser(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to save profile updates.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-[var(--color-text-muted)] p-8">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl mb-1 text-[var(--color-primary)]">Profile Settings</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Update your stats to keep your goals aligned.</p>
      </div>

      {error && <div className="bg-red-500/10 text-[var(--color-accent-red)] p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Current BMI" value={bmi > 0 ? bmi : '—'} subtitle={bmi > 0 ? bmiCategory : ''} />
        <StatCard title="Distance to Goal" value={`${distanceToTarget}kg`} subtitle={(currentWeight > 0 ? currentWeight : formData.current_weight) > formData.target_weight ? 'to lose' : 'to gain'} />
      </div>

      <Panel className="max-w-3xl">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] text-2xl font-bold">
            {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl text-[var(--color-text-main)]">{formData.full_name || 'Anonymous User'}</h2>
            <p className="text-[var(--color-text-muted)]">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Full Name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required />
            <TextInput label="Age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) || '' })} required />

            <SelectInput
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' },
              ]}
            />

            <TextInput label="Height (cm)" type="number" value={formData.height} onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) || '' })} required />
            <TextInput label="Current Weight (kg)" type="number" step="0.1" value={formData.current_weight} onChange={(e) => setFormData({ ...formData, current_weight: Number(e.target.value) || '' })} required />
            <TextInput label="Target Weight (kg)" type="number" step="0.1" value={formData.target_weight} onChange={(e) => setFormData({ ...formData, target_weight: Number(e.target.value) || '' })} required />


            <SelectInput
              label="Activity Level"
              value={formData.activity_level}
              onChange={(e) => setFormData({ ...formData, activity_level: e.target.value })}
              options={[
                { label: 'Sedentary', value: 'Sedentary' },
                { label: 'Light', value: 'Light' },
                { label: 'Moderate', value: 'Moderate' },
                { label: 'Active', value: 'Active' },
                { label: 'Very Active', value: 'Very Active' },
              ]}
            />
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-[var(--color-border)] pt-4">
            <div>
              {saved && <span className="text-[var(--color-primary)] bg-[var(--color-primary-transparent)] px-3 py-1 rounded-md text-sm font-semibold">Changes Saved!</span>}
            </div>
            <Button type="submit" disabled={saving} icon={Save}>{saving ? 'Saving...' : 'Save Profile'}</Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
