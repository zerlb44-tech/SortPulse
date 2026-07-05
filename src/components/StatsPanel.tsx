import type { LocaleContent } from '../content';
import type { AlgorithmMeta } from '../types';

interface StatsPanelProps {
  meta: AlgorithmMeta;
  comparisons: number;
  swaps: number;
  isDone: boolean;
  copy: LocaleContent['stats'];
}

export function StatsPanel({ meta, comparisons, swaps, isDone, copy }: StatsPanelProps) {
  return (
    <div className="grid gap-3 rounded-[1.5rem] border border-base-border bg-base-panel p-4 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
      <Stat label={copy.best} value={meta.best} />
      <Stat label={copy.average} value={meta.average} />
      <Stat label={copy.worst} value={meta.worst} />
      <Stat label={copy.space} value={meta.space} />
      <Stat label={copy.comparisons} value={comparisons.toLocaleString()} accent />
      <Stat label={copy.swaps} value={swaps.toLocaleString()} accent />
      <Stat label={copy.status} value={isDone ? copy.sorted : copy.running} accent={isDone} />
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-relaxed text-slate-500">
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
