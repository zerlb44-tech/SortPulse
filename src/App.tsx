import { useState } from 'react';
import { Github, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { AboutSection } from './components/AboutSection';
import { useSort } from './hooks/useSort';
import { useDarkMode } from './hooks/useDarkMode';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import { algorithmMeta } from './algorithms';
import type { AlgorithmId } from './types';

export default function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>('bubble');
  const [arraySize, setArraySize] = useState(40);
  const [speed, setSpeed] = useState(40);
  const { isDark, toggle } = useDarkMode();
  const { isEnabled: soundEnabled, toggle: toggleSound, unlock, playStepSound } = useAudioFeedback();

  const { array, states, label, isPlaying, isDone, comparisons, swaps, play, pause, reset, shuffle, stepForward } =
    useSort({
      algorithm,
      arraySize,
      speed,
      onStep: (step) => {
        playStepSound(step);
      },
    });

  const handlePlayPause = () => {
    unlock();
    if (isPlaying) {
      pause();
      return;
    }
    play();
  };

  const handleStep = () => {
    unlock();
    stepForward();
  };

  const handleReset = () => {
    unlock();
    reset();
  };

  const handleShuffle = () => {
    unlock();
    shuffle();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-base-bg text-slate-200 transition-colors">
      <header className="border-b border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold tracking-[0.18em] text-white uppercase">SortPulse</span>
            <span className="hidden text-xs text-slate-500 sm:inline">// sorting algorithm visualizer</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/zerlb44-tech/fdsed"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label="View source on GitHub"
            >
              <Github size={16} />
            </a>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => {
                unlock();
                toggleSound();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="animate-fade-in rounded-[1.75rem] border border-white/5 bg-[linear-gradient(145deg,rgba(17,22,29,0.96),rgba(9,13,18,0.92))] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-7 sm:py-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-signal-pivot/30 bg-signal-pivot/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-pivot">
              Audio + motion tuned for learning
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Watch sorting algorithms think.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Step through Bubble, Merge, Quick, and Heap sort bar by bar. Adjustable sound cues, a calmer
              neon palette, and responsive layout tweaks keep the experience readable on desktop and mobile.
            </p>
          </div>
        </section>

        <AboutSection />

        <AlgorithmSelector value={algorithm} onChange={setAlgorithm} disabled={isPlaying} />

        <Visualizer array={array} states={states} />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Legend />
          <span className="font-mono text-xs text-slate-500">
            {label ?? (isDone ? 'Done - array sorted' : isPlaying ? 'Sorting...' : 'Paused')}
          </span>
        </div>

        <Controls
          isPlaying={isPlaying}
          isDone={isDone}
          speed={speed}
          arraySize={arraySize}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onShuffle={handleShuffle}
          onStep={handleStep}
          onSpeedChange={setSpeed}
          onSizeChange={setArraySize}
        />

        <StatsPanel meta={algorithmMeta[algorithm]} comparisons={comparisons} swaps={swaps} isDone={isDone} />
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
        Built with React, TypeScript, Vite, and Tailwind CSS.
      </footer>
    </div>
  );
}
