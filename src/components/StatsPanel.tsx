import type { AlgorithmMeta } from '../types';

interface StatsPanelProps {
  meta: AlgorithmMeta;
  comparisons: number;
  swaps: number;
  isDone: boolean;
}

export function StatsPanel({ meta, comparisons, swaps, isDone }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-base-border bg-base-panel p-4 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:grid-cols-4 sm:p-5">
      <Stat label="Best" value={meta.best} />
      <Stat label="Average" value={meta.average} />
      <Stat label="Worst" value={meta.worst} />
      <Stat label="Space" value={meta.space} />
      <Stat label="Comparisons" value={comparisons.toLocaleString()} accent />
      <Stat label="Swaps" value={swaps.toLocaleString()} accent />
      <Stat label="Status" value={isDone ? 'Sorted' : 'Running'} accent={isDone} />
      <div className="col-span-2 flex items-center text-xs leading-relaxed text-slate-500 sm:col-span-1">
        {meta.description}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <span className={`font-mono text-base font-semibold ${accent ? 'text-signal-sorted' : 'text-slate-200'}`}>
        {value}
      </span>
    </div>
  );
}
