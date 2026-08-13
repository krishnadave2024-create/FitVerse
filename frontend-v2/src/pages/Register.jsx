import React, { useState } from 'react';
import { useNavigate, Link, useRouter } from '@tanstack/react-router';
import {
  ActivitySquare, User, Mail, Lock, Eye, EyeOff,
  ArrowRight, Loader2, Sparkles, Dumbbell, Utensils,
  Droplets, LineChart, Bot, Video, ShieldCheck
} from 'lucide-react';
import api from '../services/api';
import { useStore } from '../store/StoreContext';

export default function Register() {
  // ── Auth logic – completely unchanged ──────────────────────────────────────
  const navigate = useNavigate();
  const router = useRouter();
  const { login } = useStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        password: formData.password,
      });

      // Auto-login
      const loginRes = await api.post('/accounts/login/', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('access', loginRes.data.access);
      localStorage.setItem('refresh', loginRes.data.refresh);

      const profileRes = await api.get('/accounts/profile/');
      login(formData.email, profileRes.data);

      router.invalidate();
      navigate({ to: '/dashboard', replace: true });
    } catch (err) {
      setError(
        Object.values(err.response?.data || {}).flat()[0] || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };
  // ── End of auth logic ───────────────────────────────────────────────────────

  const perks = [
    { icon: Dumbbell,    text: 'Workout Tracking' },
    { icon: Utensils,    text: 'Nutrition Logger' },
    { icon: Droplets,    text: 'Water Reminder' },
    { icon: LineChart,   text: 'Analytics Dashboard' },
    { icon: Bot,         text: 'Weight Prediction' },
    { icon: Video,       text: 'Exercise Videos' },
  ];

  const benefits = [
    'Personalised workout plans',
    'Real-time nutrition & calorie tracking',
    'Smart weight prediction analytics',
  ];

  // Shared input style helper (inline event handlers for focus/blur)
  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    outline: 'none',
  };
  const handleFocus = (e) => {
    e.target.style.borderColor = '#A3FF12';
    e.target.style.boxShadow = '0 0 0 3px rgba(163,255,18,0.12)';
    e.target.style.background = 'rgba(163,255,18,0.04)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden font-sans"
      style={{ background: '#08111F', color: 'white' }}
    >

      {/* ── ANIMATED BACKGROUND ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=")`,
          }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(163,255,18,0.07)' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(124,58,237,0.10)', animationDelay: '1.2s' }}
        />
        <div
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(37,99,235,0.08)', animationDelay: '2.4s' }}
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
            Start Your{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #A3FF12, #34d399)',
              }}
            >
              Fitness Journey
            </span>{' '}
            Today
          </h2>

          <p className="text-lg leading-relaxed mb-10 max-w-sm" style={{ color: '#94A3B8' }}>
            Join thousands of athletes already tracking their progress.
          </p>

          {/* Benefits checklist */}
          <ul className="flex flex-col gap-3 mb-10">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(163,255,18,0.15)' }}
                >
                  <ShieldCheck size={12} style={{ color: '#A3FF12' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#CBD5E1' }}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-default"
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
                  <perk.icon size={16} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#E2E8F0' }}>
                  {perk.text}
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
                background:
                  'linear-gradient(90deg, transparent, rgba(163,255,18,0.6), transparent)',
              }}
            />

            <div className="p-7 sm:p-9">
              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-3xl font-black tracking-tight mb-1.5">
                  Create Account 🚀
                </h1>
                <p style={{ color: '#94A3B8' }} className="font-medium">
                  Join FitVerse and start training smarter.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Username field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="register-username"
                    className="text-sm font-semibold"
                    style={{ color: '#94A3B8' }}
                  >
                    Username / Full Name
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                      style={{ color: '#475569' }}
                    >
                      <User size={18} />
                    </div>
                    <input
                      id="register-username"
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                      disabled={loading}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="register-email"
                    className="text-sm font-semibold"
                    style={{ color: '#94A3B8' }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                      style={{ color: '#475569' }}
                    >
                      <Mail size={18} />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={loading}
                      placeholder="athlete@fitverse.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="register-password"
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
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
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

                {/* Confirm Password field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="register-confirm-password"
                    className="text-sm font-semibold"
                    style={{ color: '#94A3B8' }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                      style={{ color: '#475569' }}
                    >
                      <Lock size={18} />
                    </div>
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 transition-colors duration-200"
                      style={{ color: '#475569' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#A3FF12'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  id="register-submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-base mt-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
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
                      <span>Create Account</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Login link */}
              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold transition-colors duration-200 inline-flex items-center gap-1 group"
                    style={{ color: '#A3FF12' }}
                  >
                    Sign In
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
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
