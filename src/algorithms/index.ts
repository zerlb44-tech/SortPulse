import { bubbleSort } from './bubbleSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import type { AlgorithmId, AlgorithmMeta, SortGenerator } from '../types';

export const algorithms: Record<AlgorithmId, SortGenerator> = {
  bubble: bubbleSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
};

export const algorithmMeta: Record<AlgorithmId, AlgorithmMeta> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n\u00B2)',
    worst: 'O(n\u00B2)',
    space: 'O(1)',
    description: 'Repeatedly steps through the list, swapping adjacent elements that are out of order.',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    description: 'Divides the array into halves, sorts each recursively, then merges the sorted halves.',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n\u00B2)',
    space: 'O(log n)',
    description: 'Picks a pivot and partitions the array around it, then recursively sorts each side.',
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    description: 'Builds a max-heap, then repeatedly extracts the maximum to the end of the array.',
  },
};
