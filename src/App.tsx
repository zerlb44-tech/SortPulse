import { useState } from 'react';
import { Github, Languages, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { AboutSection } from './components/AboutSection';
import { useSort } from './hooks/useSort';
import { useDarkMode } from './hooks/useDarkMode';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import { locales, type Language } from './content';
import type { AlgorithmId } from './types';

export default function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>('bubble');
  const [arraySize, setArraySize] = useState(40);
  const [speed, setSpeed] = useState(40);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof navigator === 'undefined') return 'en';
    const value = navigator.language.toLowerCase();
    if (value.startsWith('ru')) return 'ru';
    if (value.startsWith('zh')) return 'zh';
    return 'en';
  });
  const { isDark, toggle } = useDarkMode();
  const { isEnabled: soundEnabled, toggle: toggleSound, unlock, playStepSound } = useAudioFeedback();
  const copy = locales[language];

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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold tracking-[0.18em] text-white uppercase">SortPulse</span>
            <span className="hidden text-xs text-slate-500 sm:inline">// {copy.nav.tagline}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-base-border bg-black/20 p-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500">
                <Languages size={14} />
              </span>
              {(['en', 'ru', 'zh'] as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    language === code
                      ? 'bg-signal-pivot text-white shadow-[0_8px_24px_rgba(124,140,255,0.28)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label={code}
                >
                  {code}
                </button>
              ))}
            </div>
            <a
              href="https://github.com/zerlb44-tech/SortPulse"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label={copy.nav.github}
            >
              <Github size={16} />
            </a>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label={copy.nav.theme}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => {
                unlock();
                toggleSound();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border text-slate-400 transition hover:border-signal-pivot hover:text-white"
              aria-label={soundEnabled ? copy.nav.soundOn : copy.nav.soundOff}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="animate-fade-in rounded-[1.75rem] border border-white/5 bg-[linear-gradient(145deg,rgba(17,22,29,0.96),rgba(9,13,18,0.92))] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-7 sm:py-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-signal-pivot/30 bg-signal-pivot/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-pivot motion-safe:animate-fade-up">
              {copy.hero.badge}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              {copy.hero.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full bg-signal-pivot px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {copy.hero.primaryCta}
              </a>
              <span className="inline-flex items-center rounded-full border border-base-border bg-black/20 px-4 py-2 text-sm text-slate-400">
                {copy.hero.secondaryCta}
              </span>
            </div>
          </div>
        </section>

        <AboutSection copy={copy.about} />

        <AlgorithmSelector value={algorithm} onChange={setAlgorithm} disabled={isPlaying} />

        <Visualizer array={array} states={states} />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Legend labels={copy.legend.map((item) => item.label)} />
          <span className="font-mono text-xs text-slate-500">
            {label ?? (isDone ? copy.status.done : isPlaying ? copy.status.sorting : copy.status.paused)}
          </span>
        </div>

        <Controls
          isPlaying={isPlaying}
          isDone={isDone}
          speed={speed}
          arraySize={arraySize}
          copy={copy.controls}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onShuffle={handleShuffle}
          onStep={handleStep}
          onSpeedChange={setSpeed}
          onSizeChange={setArraySize}
        />

        <StatsPanel
          meta={copy.algorithms[algorithm]}
          comparisons={comparisons}
          swaps={swaps}
          isDone={isDone}
          copy={copy.stats}
        />
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
        {copy.footer}
      </footer>
    </div>
  );
}
