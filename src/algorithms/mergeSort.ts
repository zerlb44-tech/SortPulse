import type { SortGenerator, SortStep } from '../types';

export const mergeSort: SortGenerator = function* (input) {
  const array = [...input];
  const sorted = new Set<number>();

  function* sort(lo: number, hi: number): Generator<SortStep, void, void> {
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo + hi) / 2);
    yield* sort(lo, mid);
    yield* sort(mid, hi);
    yield* merge(lo, mid, hi);
  }

  function* merge(lo: number, mid: number, hi: number): Generator<SortStep, void, void> {
    const left = array.slice(lo, mid);
    const right = array.slice(mid, hi);
    let i = 0;
    let j = 0;
    let k = lo;

    while (i < left.length && j < right.length) {
      yield {
        array: [...array],
        states: { [lo + i]: 'compare', [mid + j]: 'compare', ...markSorted(sorted) },
        label: `Merging: comparing ${left[i]} and ${right[j]}`,
      };
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      yield {
        array: [...array],
        states: { [k]: 'swap', ...markSorted(sorted) },
        label: `Placing ${array[k]} at index ${k}`,
      };
      k++;
    }
    while (i < left.length) {
      array[k] = left[i];
      yield { array: [...array], states: { [k]: 'swap', ...markSorted(sorted) }, label: `Placing ${array[k]} at index ${k}` };
      i++;
      k++;
    }
    while (j < right.length) {
      array[k] = right[j];
      yield { array: [...array], states: { [k]: 'swap', ...markSorted(sorted) }, label: `Placing ${array[k]} at index ${k}` };
      j++;
      k++;
    }
    for (let idx = lo; idx < hi; idx++) sorted.add(idx);
  }

  yield* sort(0, array.length);

  for (let i = 0; i < array.length; i++) sorted.add(i);
  yield { array: [...array], states: markSorted(sorted), label: 'Sorted' };
};

function markSorted(sorted: Set<number>) {
  const states: Record<number, 'sorted'> = {};
  sorted.forEach((i) => (states[i] = 'sorted'));
  return states;
}
