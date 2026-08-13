import React, { useState, useEffect } from 'react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import {
  Play,
  Pause,
  RotateCcw,
  Timer as TimerIcon,
  Watch,
} from 'lucide-react';

export default function Timer() {
  const [mode, setMode] = useState('timer');
  const [timeLeft, setTimeLeft] = useState(60);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(60);


  const [showCustom, setShowCustom] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const [customError, setCustomError] = useState('');

  const presets = [30, 60, 90, 120];

  useEffect(() => {
    let interval;

    if (isRunning) {
      if (mode === 'timer') {
        if (timeLeft > 0) {
          interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000);
        } else {
          setIsRunning(false);
        }
      } else {
        interval = setInterval(() => {
          setStopwatchTime((prev) => prev + 1);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const handlePreset = (seconds) => {
    setIsRunning(false);
    setTimeLeft(seconds);
    setActivePreset(seconds);
    setShowCustom(false);
  };

  const handleCustomTimer = () => {
    const minutes = Number(customMinutes) || 0;
    const seconds = Number(customSeconds) || 0;

    if (minutes < 0 || seconds < 0) {
      setCustomError('Time cannot be negative.');
      return;
    }

    if (seconds > 59) {
      setCustomError('Seconds must be between 0 and 59.');
      return;
    }

    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      setCustomError('Please enter a time greater than 0.');
      return;
    }

    setIsRunning(false);
    setTimeLeft(totalSeconds);
    setActivePreset(totalSeconds);

    setCustomError('');
    setShowCustom(false);
  };

  const toggleTimer = () => {
    if (mode === 'timer' && timeLeft === 0) {
      return;
    }

    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);

    if (mode === 'timer') {
      setTimeLeft(activePreset);
    } else {
      setStopwatchTime(0);
    }
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);

    if (newMode === 'timer') {
      setTimeLeft(activePreset);
    } else {
      setStopwatchTime(0);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex justify-center">
      <Panel className="w-full max-w-md flex flex-col items-center py-8 px-6">

        <h1 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-2">
          Rest Timer
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Optimize your recovery between sets.
        </p>

        <div className="flex bg-[var(--color-bg-base)] p-1 rounded-xl mb-10 border border-[var(--color-border)] w-full max-w-[240px]">

          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === 'timer'
                ? 'bg-[var(--color-bg-panel-hover)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
            onClick={() => switchMode('timer')}
          >
            <TimerIcon size={16} />
            Timer
          </button>

          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === 'stopwatch'
                ? 'bg-[var(--color-bg-panel-hover)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
            onClick={() => switchMode('stopwatch')}
          >
            <Watch size={16} />
            Stopwatch
          </button>

        </div>

        <div className="text-8xl font-heading font-bold tabular-nums text-[var(--color-text-main)] mb-8 tracking-wider">
          {formatTime(
            mode === 'timer'
              ? timeLeft
              : stopwatchTime
          )}
        </div>

        <div className="flex gap-4 mb-8 w-full justify-center">

          <Button
            size="lg"
            variant={isRunning ? 'ember' : 'primary'}
            onClick={toggleTimer}
            className="w-32"
          >
            {isRunning ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}

            {isRunning ? 'Pause' : 'Start'}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={resetTimer}
          >
            <RotateCcw size={24} />
          </Button>

        </div>

        {mode === 'timer' && (
          <div className="w-full">

            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 text-center">
              Presets
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">

              {presets.map((preset) => (
                <Button
                  key={preset}
                  variant={
                    activePreset === preset && !showCustom
                      ? 'primary'
                      : 'ghost'
                  }
                  size="sm"
                  onClick={() => handlePreset(preset)}
                  className={
                    activePreset === preset && !showCustom
                      ? ''
                      : 'bg-[var(--color-bg-panel-hover)]'
                  }
                >
                  {preset}s
                </Button>
              ))}

              <Button
                variant={showCustom ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setIsRunning(false);
                  setShowCustom(true);
                  setCustomError('');
                }}
                className={
                  showCustom
                    ? ''
                    : 'bg-[var(--color-bg-panel-hover)]'
                }
              >
                Custom
              </Button>

            </div>

            {showCustom && (
              <div className="mt-5 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">

                <h3 className="text-base font-semibold text-[var(--color-text-main)] mb-4 text-center">
                  Custom Timer
                </h3>

                <div className="grid grid-cols-2 gap-3">

                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">
                      Minutes
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={customMinutes}
                      onChange={(e) =>
                        setCustomMinutes(e.target.value)
                      }
                      placeholder="00"
                      className="w-full px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">
                      Seconds
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={customSeconds}
                      onChange={(e) =>
                        setCustomSeconds(e.target.value)
                      }
                      placeholder="00"
                      className="w-full px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                </div>

                {customError && (
                  <p className="text-sm text-red-500 mt-3 text-center">
                    {customError}
                  </p>
                )}

                <div className="flex gap-2 mt-4">

                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleCustomTimer}
                  >
                    Set Timer
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCustom(false);
                      setCustomError('');
                    }}
                  >
                    Cancel
                  </Button>

                </div>

              </div>
            )}

          </div>
        )}

      </Panel>
    </div>
  );
}