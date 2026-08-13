# 🚀 FitVerse V2

FitVerse V2 is a premium, modern, and comprehensive fitness tracking application designed to provide users with a complete ecosystem for managing their health. Built with a focus on stunning aesthetics, glassmorphism UI, and gamification, FitVerse transforms the daily grind of fitness into an engaging experience.

## ✨ Features

- **🏆 Gamification Engine:** A robust XP and Leveling system. Earn experience points by logging workouts, meals, meeting water goals, and maintaining streaks.
- **🎖️ Achievement Badges:** Unlock legendary badges (e.g., "Beast Mode", "Water Master") that dynamically grant bonus XP. View your entire trophy room in the dedicated Achievements page.
- **🧍 Interactive 3D Body Muscle Map:** A bespoke, dual-pane interactive anatomical map. Toggle between Front and Back views, click on muscle groups to highlight them in neon green, and instantly view targeted exercises, recovery tips, and injury prevention strategies.
- **📊 Advanced Analytics Dashboard:** A personalized, greeting-aware dashboard featuring animated SVG progress rings, daily mission checklists, dynamic BMI calculations, and real-time live fitness summary chips.
- **🎥 Exercise Video Integration:** Integrated YouTube API functionality allows users to watch high-quality exercise demonstrations directly within premium, glassmorphic exercise cards.
- **🥗 Nutrition & Water Tracking:** Comprehensive daily logs to track macronutrients and hydration, contributing directly to your daily XP and streaks.
- **🤖 AI Fitness Coach:** (Mock Integration) A dedicated module for intelligent, conversational fitness insights.
- **🌓 Dark/Light Mode:** Full CSS variable-driven theme support matching the premium FitVerse aesthetic (Neon Green, Deep Blue, Dark Navy).

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** `@tanstack/react-router`
- **Styling:** Vanilla CSS (CSS Variables, Custom Keyframe Animations, Glassmorphism) & Tailwind CSS utilities
- **Icons:** `lucide-react`
- **State Management:** Custom React Context API (`StoreContext`)
- **Date Utility:** `date-fns`

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd FitVerse/frontend-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── exercises/       # BodyMap, ExerciseVideo, etc.
│   ├── gamification/    # AchievementBadge, XPCard, etc.
│   └── ui/              # Buttons, Inputs, Panels, Tags
├── pages/               # Route components (Dashboard, Exercises, Login, etc.)
├── services/            # API integration logic
├── store/               # Global state (StoreContext) and mock data
├── utils/               # Helper functions (gamification.js, etc.)
├── App.jsx              # Main application wrapper
├── router.jsx           # TanStack router configuration
└── index.css            # Global CSS, animations, and theme variables
```

## 🔒 Production Readiness

This application is built with defensive programming principles:
- **Zero Runtime Errors:** Deep optional chaining and smart fallback defaults ensure the app never crashes from malformed data.
- **React Error Boundaries:** Critical sections (like the Dashboard) are wrapped in Error Boundaries to elegantly catch exceptions.
- **Clean Architecture:** Unused imports and dead code have been strictly pruned for optimal bundle sizes.

---
*Built with precision to make fitness tracking a premium experience.*
