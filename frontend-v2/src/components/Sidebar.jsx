import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useStore } from '../store/StoreContext';
import { Activity, LayoutDashboard, Dumbbell, List, Utensils, Droplets, LineChart, Timer, User, LogOut, X, Bot } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/workouts', label: 'Workouts', icon: Dumbbell },
  { path: '/exercises', label: 'Exercises', icon: List },
  { path: '/nutrition', label: 'Nutrition', icon: Utensils },
  { path: '/water', label: 'Water', icon: Droplets },
  { path: '/progress', label: 'Progress', icon: LineChart },
  { path: '/timer', label: 'Timer', icon: Timer },
  { path: '/profile', label: 'Profile', icon: User },
];

export function Sidebar({ isOpen, onClose }) {
  const router = useRouterState();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-[var(--color-bg-panel)] border-r border-[var(--color-border)]
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3 text-[var(--color-primary)]">
            <Activity size={32} />
            <h1 className="text-3xl font-heading tracking-wider mt-1 text-[var(--color-text-main)]">FitVerse</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block"><ThemeToggle /></div>
            <button className="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-panel-hover)] transition-colors"
              activeProps={{ className: 'bg-[var(--color-primary-transparent)] text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-transparent)]' }}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
          {user?.is_staff && (
            <Link
              to="/admin"
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-amber-500 hover:text-amber-400 hover:bg-[var(--color-bg-panel-hover)] transition-colors"
              activeProps={{ className: 'bg-amber-500/10 text-amber-500 font-semibold' }}
            >
              <User size={20} />
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)]">
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] transition-colors rounded-lg hover:bg-[var(--color-bg-panel-hover)]/50"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
