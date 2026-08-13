import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Dumbbell, Utensils, Droplets, Bot, Activity, Target, Trophy,
  BrainCircuit, Scale, ActivitySquare, Play, Globe, Code2, Mail,
  ArrowRight, CheckCircle2, ChevronRight, Sparkles, LineChart,
  Zap, HeartPulse, User, Network, Layers, ShieldCheck
} from 'lucide-react';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08111F] text-white overflow-x-hidden font-sans selection:bg-[#A3FF12] selection:text-black">

      {/* 1. BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>

        {/* Animated glowing blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#A3FF12]/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">

        {/* 2. NAVBAR */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#08111F]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl' : 'py-6 bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#A3FF12] p-2 rounded-xl text-[#08111F] shadow-[0_0_15px_rgba(163,255,18,0.4)]">
                <ActivitySquare size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight">FITVERSE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-[#94A3B8] font-medium">
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A3FF12] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('ai')} className="hover:text-white transition-colors relative group">
                Intelligence
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A3FF12] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('showcase')} className="hover:text-white transition-colors relative group">
                Showcase
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A3FF12] transition-all group-hover:w-full"></span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden md:block text-[#94A3B8] hover:text-white font-medium transition-colors">Login</Link>
              <Link to="/login" className="bg-white/5 border border-white/[0.08] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#A3FF12] hover:text-[#08111F] hover:border-[#A3FF12] transition-all shadow-[0_0_15px_rgba(163,255,18,0)] hover:shadow-[0_0_20px_rgba(163,255,18,0.3)]">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* 3. HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-8 lg:pr-10 animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <div className="inline-flex items-center gap-2 bg-[#111C2E] border border-white/[0.08] px-4 py-2 rounded-full text-[#A3FF12] font-semibold text-sm w-max shadow-lg backdrop-blur-md">
              <Sparkles size={16} /> AI Powered Fitness Platform
            </div>

            <h1 className="text-[3.5rem] md:text-[5.5rem] font-black leading-[1.1] tracking-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] to-emerald-400 drop-shadow-sm">
                Fitness Journey
              </span> <br />
              <span className="font-light opacity-90">With AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed max-w-xl font-light">
              Experience the future of health tracking. Predictive analytics, personalized routines, and seamless data visualization—all in one premium platform.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link to="/login" className="flex items-center gap-2 bg-[#A3FF12] text-[#08111F] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(163,255,18,0.25)] hover:shadow-[0_0_40px_rgba(163,255,18,0.5)]">
                Get Started <ArrowRight size={20} />
              </Link>
              <button onClick={() => scrollToSection('features')} className="flex items-center gap-2 bg-[#111C2E] border border-white/[0.08] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors group">
                Explore Features <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content (Floating 3D Mockup) */}
          <div className="flex-1 relative w-full h-[550px] lg:h-[650px] animate-in slide-in-from-right-10 fade-in duration-1000 delay-200 perspective-1000">

            {/* Center Main Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#111C2E]/90 backdrop-blur-2xl border border-white/[0.08] p-6 rounded-3xl shadow-2xl z-20">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A3FF12] to-[#7C3AED] p-0.5">
                    <div className="w-full h-full bg-[#08111F] rounded-full flex items-center justify-center font-bold">JD</div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Daily Overview</div>
                    <div className="text-sm text-[#A3FF12]">Level 24 Athlete</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#08111F]/50 p-4 rounded-2xl border border-white/[0.04]">
                  <div className="text-[#94A3B8] text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1"><Zap size={12} className="text-orange-400" /> Calories</div>
                  <div className="text-2xl font-bold">2,450 <span className="text-sm text-[#94A3B8] font-normal">kcal</span></div>
                </div>
                <div className="bg-[#08111F]/50 p-4 rounded-2xl border border-white/[0.04]">
                  <div className="text-[#94A3B8] text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1"><Scale size={12} className="text-emerald-400" /> Weight</div>
                  <div className="text-2xl font-bold">76.5 <span className="text-sm text-[#94A3B8] font-normal">kg</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#7C3AED]/20 to-[#A3FF12]/10 border border-[#7C3AED]/30 p-4 rounded-2xl flex items-center gap-4">
                <BrainCircuit className="text-[#7C3AED] shrink-0" size={24} />
                <div>
                  <div className="text-white font-bold text-sm">AI Prediction</div>
                  <div className="text-[#94A3B8] text-xs">Target weight in 24 days based on current streak.</div>
                </div>
              </div>
            </div>

            {/* Floating Element 1 - Hydration */}
            <div className="absolute top-[10%] right-[0%] lg:-right-[5%] bg-[#111C2E]/90 backdrop-blur-xl border border-white/[0.08] p-4 rounded-2xl shadow-xl z-30 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Droplets size={24} /></div>
                <div>
                  <div className="text-sm font-bold text-[#94A3B8]">Hydration</div>
                  <div className="text-lg font-bold">2.5<span className="text-sm font-normal text-[#94A3B8]"> / 3.0 L</span></div>
                </div>
              </div>
            </div>

            {/* Floating Element 2 - Workout */}
            <div className="absolute bottom-[25%] -left-[5%] lg:-left-[15%] bg-[#111C2E]/90 backdrop-blur-xl border border-white/[0.08] p-4 rounded-2xl shadow-xl z-30 animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-400"><Dumbbell size={24} /></div>
                <div>
                  <div className="text-sm font-bold text-[#94A3B8]">Today's Workout</div>
                  <div className="text-lg font-bold">Upper Body</div>
                </div>
              </div>
            </div>

            {/* Floating Element 3 - Heart Rate Graph */}
            <div className="absolute bottom-[5%] right-[5%] bg-[#111C2E]/90 backdrop-blur-xl border border-white/[0.08] p-4 rounded-2xl shadow-xl z-10 animate-pulse">
              <div className="flex items-center gap-2 mb-2 text-[#94A3B8] text-xs font-semibold uppercase tracking-wider">
                <HeartPulse size={14} className="text-rose-400" /> Avg Heart Rate
              </div>
              <div className="flex items-end gap-1 h-12">
                {[40, 60, 80, 100, 70, 50, 90].map((h, i) => (
                  <div key={i} className="w-2 bg-gradient-to-t from-rose-500/20 to-rose-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 4. STATISTICS */}
        <section className="border-y border-white/[0.04] bg-[#111C2E]/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/[0.04]">
              <StatItem value="100+" label="Premium Exercises" />
              <StatItem value="30 Day" label="AI Predictions" />
              <StatItem value="24/7" label="Intelligent Coaching" />
              <StatItem value="99%" label="Tracking Accuracy" />
            </div>
          </div>
        </section>

        {/* 5. FEATURES SECTION */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-[3rem] font-bold mb-6 tracking-tight">Everything You Need. <br /><span className="text-[#94A3B8]">Nothing You Don't.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={LineChart}
              color="text-emerald-400"
              bg="from-emerald-400/20 to-emerald-400/5"
              title="Smart Analytics"
              desc="Visualize your progress with responsive, high-performance charts and trend lines covering every metric."
            />
            <FeatureCard
              icon={Utensils}
              color="text-orange-400"
              bg="from-orange-400/20 to-orange-400/5"
              title="Macro Tracking"
              desc="Monitor calories, protein, carbs and fats effortlessly with beautiful interactive progress rings."
            />
            <FeatureCard
              icon={Trophy}
              color="text-yellow-400"
              bg="from-yellow-400/20 to-yellow-400/5"
              title="Gamified Growth"
              desc="Earn XP, level up, and unlock prestigious achievement badges as you maintain your fitness streaks."
            />
            <FeatureCard
              icon={ActivitySquare}
              color="text-blue-400"
              bg="from-blue-400/20 to-blue-400/5"
              title="Anatomy Engine"
              desc="Interact with a visual 3D-mapped muscle engine to discover targeted exercises and recovery tips."
            />
            <FeatureCard
              icon={Droplets}
              color="text-cyan-400"
              bg="from-cyan-400/20 to-cyan-400/5"
              title="Hydration Matrix"
              desc="Stay perfectly hydrated with fluid tracking algorithms and beautiful interactive liquid visualizations."
            />
          </div>
        </section>

        {/* 6. HOW IT WORKS */}
        <section className="bg-[#111C2E]/20 py-32 border-y border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-[3rem] font-bold mb-20 text-center tracking-tight">The Path to <span className="text-[#A3FF12]">Excellence</span></h2>

            <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 before:absolute before:top-0 md:before:top-12 before:bottom-0 md:before:bottom-auto md:before:left-12 md:before:right-12 before:left-1/2 before:w-0.5 md:before:w-auto md:before:h-0.5 before:bg-white/[0.08] before:-translate-x-1/2 md:before:translate-x-0">
              <TimelineNode icon={User} title="Create Profile" desc="Set your precise metrics and goals." />
              <TimelineNode icon={Dumbbell} title="Track Fitness" desc="Log your daily workouts and nutrition." />
              <TimelineNode icon={BrainCircuit} title="Get Insights" desc="Let AI analyze your consistency." />
              <TimelineNode icon={Target} title="Achieve Goals" desc="Hit targets faster than ever." />
            </div>
          </div>
        </section>

        {/* 7. AI SECTION */}
        <section id="ai" className="max-w-7xl mx-auto px-6 py-32">
          <div className="bg-[#111C2E] rounded-[2.5rem] border border-white/[0.08] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#7C3AED]/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#7C3AED]/20 text-[#7C3AED] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-6">
                  <Network size={14} /> Machine Learning
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Predictive <br />Fitness Intelligence</h2>
                <p className="text-xl text-[#94A3B8] mb-10 leading-relaxed font-light">
                  Our proprietary linear regression models analyze your historical data, workout volume, and biometrics to forecast your exact trajectory.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#08111F] p-3 rounded-2xl border border-white/[0.08] text-[#A3FF12] shrink-0"><Target size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">Weight Prediction</h4>
                      <p className="text-[#94A3B8] text-sm mt-1">Accurately forecasts your weight 30 days into the future based on current behavioral patterns.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#08111F] p-3 rounded-2xl border border-white/[0.08] text-orange-400 shrink-0"><Layers size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">Dynamic Recommendations</h4>
                      <p className="text-[#94A3B8] text-sm mt-1">Automatically curates daily workout splits aligned precisely with your BMI and recovery state.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abstract AI Illustration */}
              <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTM5LjUgMjBoLTM5IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMCAuNXYzOSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] rounded-3xl opacity-50"></div>

                <div className="relative z-10 w-48 h-48 rounded-full border border-[#7C3AED]/40 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="absolute w-64 h-64 rounded-full border border-[#7C3AED]/20 border-dashed animate-[spin_30s_linear_infinite_reverse]"></div>
                  <BrainCircuit size={64} className="text-[#7C3AED] animate-[spin_20s_linear_infinite_reverse]" />
                </div>

                <div className="absolute top-[20%] left-[10%] bg-[#08111F]/80 backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-bounce-slow">
                  +2.4kg Muscle Mass
                </div>
                <div className="absolute bottom-[20%] right-[10%] bg-[#08111F]/80 backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-xl text-sm font-bold shadow-lg text-[#A3FF12] animate-bounce-slow" style={{ animationDelay: '1s' }}>
                  94% Confidence Rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SHOWCASE */}
        <section id="showcase" className="py-32 overflow-hidden">
          <div className="text-center mb-16 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-[3rem] font-bold mb-6 tracking-tight">Flawless Design. <br />Infinite Capability.</h2>
            <p className="text-[#94A3B8] text-lg font-light">Every pixel is engineered for clarity, speed, and aesthetics. Experience a fitness interface that feels like a premium operating system.</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-12 px-6 lg:px-[10%] snap-x no-scrollbar">
            {[
              { name: 'Intelligence Dashboard', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
              { name: 'Workout Tracking Matrix', color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
              { name: 'Anatomy Engine Map', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
              { name: 'Progress Analytics', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' }
            ].map((mock, i) => (
              <div key={i} className="min-w-[85vw] md:min-w-[600px] h-[350px] md:h-[400px] bg-[#111C2E] border border-white/[0.08] rounded-3xl snap-center flex flex-col items-center justify-center relative overflow-hidden group cursor-crosshair">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] to-transparent opacity-80 z-10"></div>

                {/* Mock UI Elements */}
                <div className="absolute w-[80%] h-[60%] bg-[#08111F] rounded-t-2xl border border-white/[0.08] bottom-0 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                  <div className="w-full h-8 border-b border-white/[0.04] flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-8 flex items-center justify-center h-full opacity-30 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <Activity size={48} className={mock.color.split(' ')[2]} />
                  </div>
                </div>

                <div className={`relative z-20 px-6 py-2 rounded-full font-bold text-sm backdrop-blur-md border shadow-2xl ${mock.color}`}>
                  {mock.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. TECH STACK */}
        <section className="py-24 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-[#94A3B8] mb-10 uppercase tracking-[0.2em]">Engineered with Enterprise Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Vite', 'TanStack Router', 'Context API', 'Machine Learning', 'CSS Variables', 'Tailwind', 'Lucide Icons'].map((tech, i) => (
              <div key={i} className="bg-[#111C2E] border border-white/[0.08] px-6 py-3 rounded-full font-medium text-white/80 hover:bg-[#111C2E]/50 hover:border-white/20 transition-colors cursor-default shadow-sm">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* 10. CALL TO ACTION */}
        <section className="relative py-40 overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A3FF12]/5 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-[4.5rem] font-black mb-8 tracking-tight leading-tight">Ready to Transform?</h2>
            <p className="text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto font-light">Join the next generation of fitness tracking. Build your legacy with FitVerse.</p>
            <Link to="/login" className="inline-flex items-center justify-center gap-3 bg-[#A3FF12] text-[#08111F] px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(163,255,18,0.2)] hover:shadow-[0_0_60px_rgba(163,255,18,0.4)] group">
              Start Your Journey <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 11. FOOTER */}
        <footer className="border-t border-white/[0.08] bg-[#08111F] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ActivitySquare className="text-[#A3FF12]" size={28} />
                <span className="text-2xl font-black tracking-tight">FITVERSE</span>
              </div>
              <p className="text-[#94A3B8] max-w-xs font-light">The definitive AI-powered fitness operating system for modern athletes.</p>
            </div>

            <div className="flex gap-16 text-sm">
              <div className="flex flex-col gap-4">
                <div className="font-bold text-white uppercase tracking-wider">Product</div>
                <Link to="/login" className="text-[#94A3B8] hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="text-[#94A3B8] hover:text-white transition-colors">Register</Link>
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-bold text-white uppercase tracking-wider">Connect</div>
                <div className="flex items-center gap-4 text-[#94A3B8]">
                  <Globe className="hover:text-white cursor-pointer transition-colors" size={20} />
                  <Code2 className="hover:text-white cursor-pointer transition-colors" size={20} />
                  <Mail className="hover:text-white cursor-pointer transition-colors" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#94A3B8] text-sm">
              &copy; {new Date().getFullYear()} FitVerse Platform. All rights reserved.
            </div>
            <div className="text-[#94A3B8] text-sm flex items-center gap-2">
              <ShieldCheck size={16} /> Secure & Private Data
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Subcomponents
function StatItem({ value, label }) {
  return (
    <div className="text-center px-4">
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{value}</div>
      <div className="text-sm md:text-base text-[#94A3B8] font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, color, bg, title, desc }) {
  return (
    <div className="bg-[#111C2E] border border-white/[0.08] p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 group cursor-default shadow-lg">
      <div className={`bg-gradient-to-br ${bg} ${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/[0.04] group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-[#94A3B8] leading-relaxed font-light">{desc}</p>
      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
        Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

function TimelineNode({ icon: Icon, title, desc }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-[200px] group">
      <div className="w-20 h-20 rounded-full bg-[#111C2E] border-4 border-[#08111F] flex items-center justify-center text-[#A3FF12] shadow-[0_0_30px_rgba(163,255,18,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(163,255,18,0.3)] transition-all duration-300 mb-6 relative">
        <Icon size={32} />
      </div>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-[#94A3B8] text-sm font-light">{desc}</p>
    </div>
  );
}
