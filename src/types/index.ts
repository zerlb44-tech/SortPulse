export type BarState = 'idle' | 'compare' | 'swap' | 'sorted' | 'pivot';

export interface SortStep {
  /** Full array snapshot at this step */
  array: number[];
  /** Indices and the visual state they should render with */
  states: Record<number, BarState>;
  /** Optional short description of what's happening, shown in the status line */
  label?: string;
}

export type AlgorithmId = 'bubble' | 'merge' | 'quick' | 'heap';

export interface AlgorithmMeta {
  id: AlgorithmId;
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  description: string;
}

export type SortGenerator = (input: number[]) => Generator<SortStep, void, void>;
