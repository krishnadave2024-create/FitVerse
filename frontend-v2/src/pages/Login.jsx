import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useRouter } from '@tanstack/react-router';
import { useStore } from '../store/StoreContext';
import {
  Activity, Dumbbell, Utensils, Droplets, LineChart,
  Bot, Video, Mail, Lock,
  Eye, EyeOff, ArrowRight, Loader2
} from 'lucide-react';
import api from '../services/api';

// Custom CountUp Hook
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
}

export default function Login() {
  const navigate = useNavigate();
  const router = useRouter();
  const { login } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Stats
  const usersCount = useCountUp(12, 2000);
  const workoutsCount = useCountUp(150, 2500);
  const satisfactionCount = useCountUp(98, 3000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/accounts/login/', { email, password });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      const profileRes = await api.get('/accounts/profile/');
      login(email, profileRes.data);

      router.invalidate();
      navigate({ to: '/dashboard', replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Dumbbell, text: 'Workout Tracking' },
    { icon: Utensils, text: 'Nutrition Logger' },
    { icon: Droplets, text: 'Water Reminder' },
    { icon: LineChart, text: 'Analytics Dashboard' },
    { icon: Bot, text: 'Weight Prediction' },
    { icon: Video, text: 'Exercise Videos' }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--color-bg-base)] text-[var(--color-text-main)] overflow-hidden relative font-body selection:bg-[var(--color-primary)] selection:text-white">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary)]/20 blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/15 blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      </div>

      {/* LEFT PANEL */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between p-8 md:p-12 z-10 relative border-b lg:border-b-0 lg:border-r border-[var(--color-border)]/50 bg-[var(--color-bg-base)]/40 backdrop-blur-3xl">

        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 text-[var(--color-primary)] mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <Activity size={40} className="drop-shadow-[0_0_15px_rgba(132,204,22,0.4)]" />
            <h1 className="text-4xl font-heading tracking-wider mt-1 text-[var(--color-text-main)]">FitVerse</h1>
          </div>

          <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-150 fill-mode-both">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-cyan-400">Fitness Journey</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg md:text-xl max-w-md leading-relaxed mb-10">
              Track workouts, nutrition, hydration, Weight Prediction, progress analytics, exercise videos and premium plans — all in one platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both max-w-lg">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-panel)]/40 border border-[var(--color-border)]/50 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-[var(--color-bg-panel-hover)]/60 hover:border-[var(--color-primary)]/30 transition-all duration-300 group cursor-default"
              >
                <div className="p-2 rounded-lg bg-[var(--color-bg-base)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 transition-colors">
                  <feature.icon size={18} />
                </div>
                <span className="text-sm font-medium text-[var(--color-text-main)]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-8 md:p-12 z-10 relative">
        <div className="w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both">

          <div className="bg-[var(--color-bg-panel)]/60 backdrop-blur-2xl border border-[var(--color-border)]/60 rounded-[28px] shadow-2xl overflow-hidden relative">
            {/* Top highlight line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent"></div>

            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back 👋</h2>
              <p className="text-[var(--color-text-muted)] mb-8 font-medium">Sign in to continue your fitness journey.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Custom Email Input */}
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-[var(--color-bg-base)]/50 border border-[var(--color-border)] text-[var(--color-text-main)] text-base rounded-xl px-4 py-3.5 pl-12 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-[var(--color-bg-base)] transition-all peer placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-12 -top-2.5 bg-[var(--color-bg-panel)] px-1 text-sm text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-text-muted)]/70 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--color-primary)] cursor-text"
                  >
                    Email Address
                  </label>
                </div>

                {/* Custom Password Input */}
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-[var(--color-bg-base)]/50 border border-[var(--color-border)] text-[var(--color-text-main)] text-base rounded-xl px-4 py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-[var(--color-bg-base)] transition-all peer placeholder-transparent"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-12 -top-2.5 bg-[var(--color-bg-panel)] px-1 text-sm text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-text-muted)]/70 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--color-primary)] cursor-text"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-medium animate-in slide-in-from-top-1 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full mt-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-[var(--color-text-muted)]">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-[var(--color-text-main)] font-semibold hover:text-[var(--color-primary)] transition-colors group inline-flex items-center gap-1">
                    Create Free Account
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
