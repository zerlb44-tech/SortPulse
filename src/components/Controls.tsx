import { Pause, Play, RotateCcw, Shuffle, SkipForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  isDone: boolean;
  speed: number;
  arraySize: number;
  onPlayPause: () => void;
  onReset: () => void;
  onShuffle: () => void;
  onStep: () => void;
  onSpeedChange: (value: number) => void;
  onSizeChange: (value: number) => void;
}

export function Controls({
  isPlaying,
  isDone,
  speed,
  arraySize,
  onPlayPause,
  onReset,
  onShuffle,
  onStep,
  onSpeedChange,
  onSizeChange,
}: ControlsProps) {
  return (
    <div className="grid gap-4 rounded-[1.5rem] border border-base-border bg-base-panel p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-5 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onPlayPause}
          disabled={isDone}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-signal-pivot text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={onStep}
          disabled={isPlaying || isDone}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-base-border text-slate-300 transition hover:border-signal-pivot hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Step forward"
        >
          <SkipForward size={16} />
        </button>
        <button
          onClick={onReset}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-base-border text-slate-300 transition hover:border-signal-pivot hover:text-white"
          aria-label="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onShuffle}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-base-border text-slate-300 transition hover:border-signal-pivot hover:text-white"
          aria-label="New random array"
        >
          <Shuffle size={16} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <label className="flex items-center gap-3 text-sm text-slate-400">
          <span className="w-16 shrink-0 font-mono uppercase tracking-wide">Speed</span>
          <input
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full accent-signal-pivot"
          />
          <span className="w-8 shrink-0 text-right font-mono">{speed}</span>
        </label>

        <label className="flex items-center gap-3 text-sm text-slate-400">
          <span className="w-16 shrink-0 font-mono uppercase tracking-wide">Size</span>
          <input
            type="range"
            min={5}
            max={150}
            value={arraySize}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full accent-signal-pivot"
          />
          <span className="w-8 shrink-0 text-right font-mono">{arraySize}</span>
        </label>
      </div>
    </div>
  );
}
