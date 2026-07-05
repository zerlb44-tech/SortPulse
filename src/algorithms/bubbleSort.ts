import type { SortGenerator } from '../types';

export const bubbleSort: SortGenerator = function* (input) {
  const array = [...input];
  const n = array.length;
  const sorted = new Set<number>();

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        states: { [j]: 'compare', [j + 1]: 'compare', ...markSorted(sorted) },
        label: `Comparing index ${j} and ${j + 1}`,
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swappedInPass = true;
        yield {
          array: [...array],
          states: { [j]: 'swap', [j + 1]: 'swap', ...markSorted(sorted) },
          label: `Swapped index ${j} and ${j + 1}`,
        };
      }
    }
    sorted.add(n - i - 1);
    if (!swappedInPass) break;
  }

  for (let i = 0; i < n; i++) sorted.add(i);
  yield { array: [...array], states: markSorted(sorted), label: 'Sorted' };
};

function markSorted(sorted: Set<number>) {
  const states: Record<number, 'sorted'> = {};
  sorted.forEach((i) => (states[i] = 'sorted'));
  return states;
}
