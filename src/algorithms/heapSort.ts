import type { SortGenerator, SortStep } from '../types';

export const heapSort: SortGenerator = function* (input) {
  const array = [...input];
  const n = array.length;
  const sorted = new Set<number>();

  function* heapify(size: number, root: number): Generator<SortStep, void, void> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      yield {
        array: [...array],
        states: { [largest]: 'compare', [left]: 'compare', ...markSorted(sorted) },
        label: `Comparing index ${largest} and ${left}`,
      };
      if (array[left] > array[largest]) largest = left;
    }
    if (right < size) {
      yield {
        array: [...array],
        states: { [largest]: 'compare', [right]: 'compare', ...markSorted(sorted) },
        label: `Comparing index ${largest} and ${right}`,
      };
      if (array[right] > array[largest]) largest = right;
    }
    if (largest !== root) {
      [array[root], array[largest]] = [array[largest], array[root]];
      yield {
        array: [...array],
        states: { [root]: 'swap', [largest]: 'swap', ...markSorted(sorted) },
        label: `Swapped index ${root} and ${largest}`,
      };
      yield* heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    [array[0], array[end]] = [array[end], array[0]];
    sorted.add(end);
    yield {
      array: [...array],
      states: { 0: 'swap', [end]: 'sorted', ...markSorted(sorted) },
      label: `Moved max to index ${end}`,
    };
    yield* heapify(end, 0);
  }

  sorted.add(0);
  yield { array: [...array], states: markSorted(sorted), label: 'Sorted' };
};

function markSorted(sorted: Set<number>) {
  const states: Record<number, 'sorted'> = {};
  sorted.forEach((i) => (states[i] = 'sorted'));
  return states;
}
