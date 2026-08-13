import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultUser } from './mockData';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const getAppData = () => {
  const data = localStorage.getItem('fitverse_app_data');
  return data ? JSON.parse(data) : { users: {}, currentUser: null };
};

const saveAppData = (data) => {
  localStorage.setItem('fitverse_app_data', JSON.stringify(data));
};

export const StoreProvider = ({ children }) => {
  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    const appData = getAppData();
    return appData.currentUser;
  });

  const loadUserData = (email) => {
    const appData = getAppData();
    if (email && appData.users[email]) {
      return appData.users[email];
    }
    return {
       user: { ...defaultUser, email, isAuthenticated: !!email },
       workouts: [],
       meals: [],
       water: [],
       weightHistory: []
    };
  };

  const initialData = loadUserData(currentUserEmail);

  const [user, setUser] = useState(initialData.user);
  const [workouts, setWorkouts] = useState(initialData.workouts);
  const [meals, setMeals] = useState(initialData.meals);
  const [water, setWater] = useState(initialData.water);
  const [weightHistory, setWeightHistory] = useState(initialData.weightHistory || []);

  // Sync to appData
  useEffect(() => {
    if (!currentUserEmail) return;
    const appData = getAppData();
    if (!appData.users[currentUserEmail]) {
      appData.users[currentUserEmail] = {};
    }
    appData.users[currentUserEmail] = { user, workouts, meals, water, weightHistory };
    appData.currentUser = currentUserEmail;
    saveAppData(appData);
  }, [user, workouts, meals, water, weightHistory, currentUserEmail]);

  const addWorkout = (workout) => setWorkouts(prev => [workout, ...prev]);
  const removeWorkout = (id) => setWorkouts(prev => prev.filter(w => w.id !== id));
  
  const addMeal = (meal) => setMeals(prev => [meal, ...prev]);
  const removeMeal = (id) => setMeals(prev => prev.filter(m => m.id !== id));
  
  const addWater = (entry) => setWater(prev => [entry, ...prev]);
  const removeWater = (id) => setWater(prev => prev.filter(w => w.id !== id));

  const addWeightLog = (entry) => setWeightHistory(prev => [entry, ...prev]);
  const removeWeightLog = (id) => setWeightHistory(prev => prev.filter(w => w.id !== id));

  // Derived state: currentWeight
  // 1. Sort by date desc, then by original array order (to handle same-day entries)
  const sortedWeightHistory = [...weightHistory].sort((a,b) => new Date(b.date) - new Date(a.date));
  const latestProgressWeight = sortedWeightHistory.length > 0 ? sortedWeightHistory[0].weight : null;
  const currentWeight = latestProgressWeight !== null ? latestProgressWeight : (user?.current_weight || 0);

  const logout = () => {
    const appData = getAppData();
    appData.currentUser = null;
    saveAppData(appData);

    setCurrentUserEmail(null);
    setUser(defaultUser);
    setWorkouts([]);
    setMeals([]);
    setWater([]);
    setWeightHistory([]);

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    
    // Clean up legacy keys
    localStorage.removeItem('fitverse_user');
    localStorage.removeItem('fitverse_workouts');
    localStorage.removeItem('fitverse_meals');
    localStorage.removeItem('fitverse_water');
    
    window.location.href = '/';
  };

  const login = (email, userDataOverrides = null) => {
    const appData = getAppData();
    let userData = appData.users[email];
    if (!userData) {
      // New user registration or first login
      userData = {
         user: { ...defaultUser, email, isAuthenticated: true, ...userDataOverrides },
         workouts: [],
         meals: [],
         water: [],
         weightHistory: []
      };
      appData.users[email] = userData;
    } else {
      // Existing user login
      if (userDataOverrides) {
        userData.user = { ...userData.user, ...userDataOverrides, isAuthenticated: true };
      } else {
        userData.user = { ...userData.user, isAuthenticated: true };
      }
    }
    appData.currentUser = email;
    saveAppData(appData);
    
    setCurrentUserEmail(email);
    setUser(userData.user);
    setWorkouts(userData.workouts);
    setMeals(userData.meals);
    setWater(userData.water);
    setWeightHistory(userData.weightHistory || []);
  };

  return (
    <StoreContext.Provider value={{
      user, setUser, logout, login,
      workouts, addWorkout, removeWorkout,
      meals, addMeal, removeMeal,
      water, addWater, removeWater,
      weightHistory, addWeightLog, removeWeightLog,
      currentWeight
    }}>
      {children}
    </StoreContext.Provider>
  );
};
