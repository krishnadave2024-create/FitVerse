import React from 'react';
import { createRootRoute, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Workouts from './pages/Workouts';
import Exercises from './pages/Exercises';
import Nutrition from './pages/Nutrition';
import Water from './pages/Water';
import Progress from './pages/Progress';
import Timer from './pages/Timer';
import Achievements from './pages/Achievements';

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex h-screen bg-[var(--color-bg-base)] text-[var(--color-text-main)] overflow-hidden">
      <Outlet />
    </div>
  ),
});

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 pb-20 md:pb-0 bg-[var(--color-bg-base)]">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// App Layout (Sidebar + Main Content) – requires authentication
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  beforeLoad: () => {
    const token = localStorage.getItem('access');
    if (!token) {
      throw redirect({ to: '/login', replace: true });
    }
  },
  component: AppLayout
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const token = localStorage.getItem('access');
    if (token) throw redirect({ to: '/dashboard', replace: true });
  },
  component: Landing
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    const token = localStorage.getItem('access');
    if (token) throw redirect({ to: '/dashboard', replace: true });
  },
  component: Login
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  beforeLoad: () => {
    const token = localStorage.getItem('access');
    if (token) throw redirect({ to: '/dashboard', replace: true });
  },
  component: Register
});

const dashboardRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/dashboard', component: Dashboard });
const profileRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/profile', component: Profile });
const workoutsRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/workouts', component: Workouts });
const exercisesRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/exercises', component: Exercises });
const nutritionRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/nutrition', component: Nutrition });
const waterRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/water', component: Water });
const progressRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/progress', component: Progress });
const timerRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/timer', component: Timer });
const achievementsRoute = createRoute({ getParentRoute: () => appLayoutRoute, path: '/achievements', component: Achievements });

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  registerRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    profileRoute,
    workoutsRoute,
    exercisesRoute,
    nutritionRoute,
    waterRoute,
    progressRoute,
    timerRoute,
    achievementsRoute,
  ])
]);

export const router = createRouter({ routeTree });
