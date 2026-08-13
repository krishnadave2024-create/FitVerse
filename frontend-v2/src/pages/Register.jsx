import React, { useState } from 'react';
import { useNavigate, Link, useRouter } from '@tanstack/react-router';
import { Activity } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { TextInput } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../services/api';

import { useStore } from '../store/StoreContext';

export default function Register() {
  const navigate = useNavigate();
  const router = useRouter();
  const { login } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/accounts/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Auto-login
      const loginRes = await api.post('/accounts/login/', { 
        email: formData.email, 
        password: formData.password 
      });
      localStorage.setItem('access', loginRes.data.access);
      localStorage.setItem('refresh', loginRes.data.refresh);
      
      const profileRes = await api.get('/accounts/profile/');
      login(formData.email, profileRes.data);
      
      router.invalidate();
      navigate({ to: '/dashboard', replace: true });
    } catch (err) {
      setError(Object.values(err.response?.data || {}).flat()[0] || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--color-bg-base)]">
      <Panel className="w-full max-w-md shadow-2xl overflow-hidden border border-[var(--color-border)]">
        <div className="bg-[var(--color-bg-panel-hover)] py-8 border-b border-[var(--color-border)] flex flex-col items-center">
          <Activity size={56} className="text-[var(--color-primary)] mb-4 drop-shadow-md" />
          <h1 className="text-4xl text-[var(--color-text-main)] tracking-wider">JOIN FITVERSE</h1>
          <p className="text-[var(--color-text-muted)] mt-2 font-medium">Start your fitness journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
          <TextInput 
            label="Username / Full Name" 
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            placeholder="John Doe"
            required
            disabled={loading}
          />
          <TextInput 
            label="Email" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="athlete@fitverse.com"
            required
            disabled={loading}
          />
          <TextInput 
            label="Password" 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="••••••••"
            required
            disabled={loading}
          />
          <TextInput 
            label="Confirm Password" 
            type="password" 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="••••••••"
            required
            disabled={loading}
          />
          
          {error && <p className="text-[var(--color-accent-red)] text-sm">{error}</p>}
          
          <Button type="submit" size="lg" className="mt-4" disabled={loading} fullWidth>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-primary)] hover:underline">
            Log in
          </Link>
        </div>
      </Panel>
    </div>
  );
}
