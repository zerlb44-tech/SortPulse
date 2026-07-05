import { useCallback, useEffect, useRef, useState } from 'react';
import { algorithms } from '../algorithms';
import type { AlgorithmId, SortStep } from '../types';

function randomArray(size: number, max = 400): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - 10)) + 10);
}

interface UseSortOptions {
  algorithm: AlgorithmId;
  arraySize: number;
  speed: number; // 1 (slow) - 100 (fast)
  onStep?: (step: SortStep) => void;
}

export function useSort({ algorithm, arraySize, speed, onStep }: UseSortOptions) {
  const [baseArray, setBaseArray] = useState<number[]>(() => randomArray(arraySize));
  const [step, setStep] = useState<SortStep>({ array: baseArray, states: {} });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generatorRef = useRef<Generator<SortStep, void, void> | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const onStepRef = useRef(onStep);

  useEffect(() => {
    onStepRef.current = onStep;
  }, [onStep]);

  const resetGenerator = useCallback(
    (array: number[]) => {
      generatorRef.current = algorithms[algorithm](array);
      setStep({ array, states: {} });
      setIsDone(false);
      setComparisons(0);
      setSwaps(0);
    },
    [algorithm]
  );

  // Regenerate the base array whenever size or algorithm changes
  useEffect(() => {
    const arr = randomArray(arraySize);
    setBaseArray(arr);
    setIsPlaying(false);
    resetGenerator(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize, algorithm]);

  const shuffle = useCallback(() => {
    const arr = randomArray(arraySize);
    setBaseArray(arr);
    setIsPlaying(false);
    resetGenerator(arr);
  }, [arraySize, resetGenerator]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    resetGenerator(baseArray);
  }, [baseArray, resetGenerator]);

  const advance = useCallback(() => {
    const gen = generatorRef.current;
    if (!gen) return;
    const { value, done } = gen.next();
    if (done || !value) {
      setIsDone(true);
      setIsPlaying(false);
      return;
    }
    onStepRef.current?.(value);
    setStep(value);
    const states = Object.values(value.states);
    if (states.includes('compare') || states.includes('pivot')) setComparisons((c) => c + 1);
    if (states.includes('swap')) setSwaps((s) => s + 1);
  }, []);

  const play = useCallback(() => {
    if (isDone) return;
    setIsPlaying(true);
  }, [isDone]);

  const pause = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    if (!isPlaying) return;
    const delay = Math.max(1000 / speed, 4);
    timeoutRef.current = window.setTimeout(() => {
      advance();
    }, delay);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, speed, step, advance]);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    advance();
  }, [advance]);

  return {
    array: step.array,
    states: step.states,
    label: step.label,
    isPlaying,
    isDone,
    comparisons,
    swaps,
    play,
    pause,
    reset,
    shuffle,
    stepForward,
  };
}
