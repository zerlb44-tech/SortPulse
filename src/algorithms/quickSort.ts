import type { SortGenerator, SortStep } from '../types';

export const quickSort: SortGenerator = function* (input) {
  const array = [...input];
  const sorted = new Set<number>();

  function* sort(lo: number, hi: number): Generator<SortStep, void, void> {
    if (lo >= hi) {
      if (lo === hi) sorted.add(lo);
      return;
    }
    const pivotIndex = yield* partition(lo, hi);
    sorted.add(pivotIndex);
    yield* sort(lo, pivotIndex - 1);
    yield* sort(pivotIndex + 1, hi);
  }

  function* partition(lo: number, hi: number): Generator<SortStep, number, void> {
    const pivotValue = array[hi];
    let i = lo - 1;

    for (let j = lo; j < hi; j++) {
      yield {
        array: [...array],
        states: { [hi]: 'pivot', [j]: 'compare', ...markSorted(sorted) },
        label: `Comparing ${array[j]} to pivot ${pivotValue}`,
      };
      if (array[j] < pivotValue) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        yield {
          array: [...array],
          states: { [hi]: 'pivot', [i]: 'swap', [j]: 'swap', ...markSorted(sorted) },
          label: `Swapped index ${i} and ${j}`,
        };
      }
    }
    [array[i + 1], array[hi]] = [array[hi], array[i + 1]];
    yield {
      array: [...array],
      states: { [i + 1]: 'swap', ...markSorted(sorted) },
      label: `Pivot placed at index ${i + 1}`,
    };
    return i + 1;
  }

  yield* sort(0, array.length - 1);

  for (let i = 0; i < array.length; i++) sorted.add(i);
  yield { array: [...array], states: markSorted(sorted), label: 'Sorted' };
};

function markSorted(sorted: Set<number>) {
  const states: Record<number, 'sorted'> = {};
  sorted.forEach((i) => (states[i] = 'sorted'));
  return states;
}
