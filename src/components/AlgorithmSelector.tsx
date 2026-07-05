import { algorithmMeta } from '../algorithms';
import type { AlgorithmId } from '../types';

interface AlgorithmSelectorProps {
  value: AlgorithmId;
  onChange: (id: AlgorithmId) => void;
  disabled: boolean;
}

export function AlgorithmSelector({ value, onChange, disabled }: AlgorithmSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(algorithmMeta).map((meta) => {
        const active = meta.id === value;
        return (
          <button
            key={meta.id}
            disabled={disabled}
            onClick={() => onChange(meta.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              active
                ? 'border-signal-pivot bg-signal-pivot/10 text-white shadow-[0_0_0_1px_rgba(124,140,255,0.2)]'
                : 'border-base-border text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {meta.name}
          </button>
        );
      })}
    </div>
  );
}
