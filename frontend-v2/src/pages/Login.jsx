import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useRouter } from '@tanstack/react-router';
import { useStore } from '../store/StoreContext';
import {
  Activity, Dumbbell, Utensils, Droplets, LineChart,
  Bot, Video, Mail, Lock,
  Eye, EyeOff, ArrowRight, Loader2, Sparkles, ActivitySquare
} from 'lucide-react';
import api from '../services/api';

// Custom CountUp Hook — unchanged
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
  // ── Auth logic – completely unchanged ──────────────────────────────────────
  const navigate = useNavigate();
  const router = useRouter();
  const { login } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Stats counters
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
  // ── End of auth logic ───────────────────────────────────────────────────────

  const features = [
    { icon: Dumbbell,   text: 'Workout Tracking' },
    { icon: Utensils,   text: 'Nutrition Logger' },
    { icon: Droplets,   text: 'Water Reminder' },
    { icon: LineChart,  text: 'Analytics Dashboard' },
    { icon: Bot,        text: 'Weight Prediction' },
    { icon: Video,      text: 'Exercise Videos' },
  ];
  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden font-sans"
      style={{ background: '#08111F', color: 'white' }}
    >

      {/* ── ANIMATED BACKGROUND ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=")`,
          }}
        />
        {/* Glowing blobs — matching Landing exactly */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(163,255,18,0.08)' }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(124,58,237,0.12)', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(37,99,235,0.10)', animationDelay: '2s' }}
        />
      </div>

      {/* ── LEFT BRANDING PANEL (hidden on mobile) ─────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] flex-col justify-between p-10 xl:p-14 z-10 relative"
        style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{
              background: '#A3FF12',
              color: '#08111F',
              boxShadow: '0 0 18px rgba(163,255,18,0.4)',
            }}
          >
            <ActivitySquare size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight">FITVERSE</span>
        </div>

        {/* Hero text */}
        <div className="flex-1 flex flex-col justify-center py-12">
          

          <h2
            className="font-black leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4rem)' }}
          >
            Transform Your{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #A3FF12, #34d399)',
              }}
            >
              Fitness Journey
            </span>{' '}
          </h2>

          <p className="text-lg leading-relaxed mb-10 max-w-sm" style={{ color: '#94A3B8' }}>
            Track workouts, nutrition, hydration, and more — all in one premium platform.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-default group"
                style={{
                  background: '#111C2E',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(163,255,18,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="p-1.5 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(163,255,18,0.1)', color: '#A3FF12' }}
                >
                  <feature.icon size={16} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#E2E8F0' }}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── RIGHT FORM PANEL ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 relative px-4 py-10 sm:px-8 lg:px-10">

        {/* Mobile-only logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10 self-start">
          <div
            className="p-2 rounded-xl"
            style={{
              background: '#A3FF12',
              color: '#08111F',
              boxShadow: '0 0 15px rgba(163,255,18,0.4)',
            }}
          >
            <ActivitySquare size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">FITVERSE</span>
        </div>

        {/* Card */}
        <div
          className="w-full animate-in fade-in zoom-in-95 duration-500"
          style={{ maxWidth: '460px' }}
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: '#111C2E',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(163,255,18,0.05)',
            }}
          >
            {/* Top green accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(163,255,18,0.6), transparent)',
              }}
            />

            <div className="p-7 sm:p-9">
              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-3xl font-black tracking-tight mb-1.5">
                  Welcome Back 👋
                </h1>
                <p style={{ color: '#94A3B8' }} className="font-medium">
                  Sign in to continue your fitness journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="login-email"
                    className="text-sm font-semibold"
                    style={{ color: '#94A3B8' }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors"
                      style={{ color: '#475569' }}
                    >
                      <Mail size={18} />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        outline: 'none',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#A3FF12';
                        e.target.style.boxShadow = '0 0 0 3px rgba(163,255,18,0.12)';
                        e.target.style.background = 'rgba(163,255,18,0.04)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold"
                    style={{ color: '#94A3B8' }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                      style={{ color: '#475569' }}
                    >
                      <Lock size={18} />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        outline: 'none',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#A3FF12';
                        e.target.style.boxShadow = '0 0 0 3px rgba(163,255,18,0.12)';
                        e.target.style.background = 'rgba(163,255,18,0.04)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 transition-colors duration-200"
                      style={{ color: '#475569' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#A3FF12'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium animate-in slide-in-from-top-1 duration-200"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.25)',
                      color: '#FCA5A5',
                    }}
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  id="login-submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-base mt-1 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
                  style={{
                    background: '#A3FF12',
                    color: '#08111F',
                    boxShadow: '0 0 25px rgba(163,255,18,0.25)',
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                      e.currentTarget.style.boxShadow = '0 0 35px rgba(163,255,18,0.45)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(163,255,18,0.25)';
                  }}
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>

              {/* Register link */}
              <div className="mt-7 text-center">
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-bold transition-colors duration-200 inline-flex items-center gap-1 group"
                    style={{ color: '#A3FF12' }}
                  >
                    Create Free Account
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
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
