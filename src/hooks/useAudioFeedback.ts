import { useCallback, useEffect, useRef, useState } from 'react';
import type { SortStep } from '../types';

type SoundKind = 'compare' | 'swap' | 'pivot' | 'sorted';

interface UseAudioFeedbackResult {
  isEnabled: boolean;
  isUnlocked: boolean;
  toggle: () => void;
  unlock: () => void;
  playStepSound: (step: SortStep) => void;
}

const STORAGE_KEY = 'sortlab.sound';
const MIN_INTERVAL_MS: Record<SoundKind, number> = {
  compare: 90,
  swap: 70,
  pivot: 120,
  sorted: 180,
};

export function useAudioFeedback(): UseAudioFeedbackResult {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const lastPlayedAtRef = useRef<Record<SoundKind, number>>({
    compare: 0,
    swap: 0,
    pivot: 0,
    sorted: 0,
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(isEnabled));
  }, [isEnabled]);

  const ensureContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!contextRef.current) {
      const AudioContextCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return null;
      contextRef.current = new AudioContextCtor();
    }
    return contextRef.current;
  }, []);

  const unlock = useCallback(() => {
    const context = ensureContext();
    if (!context) return;
    if (context.state === 'suspended') {
      void context.resume();
    }
    setIsUnlocked(true);
  }, [ensureContext]);

  useEffect(() => {
    return () => {
      void contextRef.current?.close();
    };
  }, []);

  const playTone = useCallback(
    (kind: SoundKind) => {
      if (!isEnabled || !isUnlocked) return;

      const context = ensureContext();
      if (!context || context.state === 'closed') return;

      const now = context.currentTime;
      const lastPlayedAt = lastPlayedAtRef.current[kind];
      if (Date.now() - lastPlayedAt < MIN_INTERVAL_MS[kind]) return;
      lastPlayedAtRef.current[kind] = Date.now();

      const gain = context.createGain();
      gain.connect(context.destination);
      gain.gain.value = 0.0001;

      const start = now + 0.01;
      const beep = (frequency: number, duration: number, volume: number, type: OscillatorType = 'sine', detune = 0) => {
        const oscillator = context.createOscillator();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        oscillator.connect(gain);

        gain.gain.cancelScheduledValues(start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

        oscillator.start(start);
        oscillator.stop(start + duration + 0.02);
      };

      switch (kind) {
        case 'compare':
          beep(520, 0.07, 0.03, 'triangle');
          beep(660, 0.12, 0.02, 'sine', -10);
          break;
        case 'swap':
          beep(220, 0.1, 0.04, 'square', -5);
          beep(165, 0.16, 0.025, 'triangle');
          break;
        case 'pivot':
          beep(740, 0.09, 0.03, 'sine');
          beep(988, 0.13, 0.018, 'sine');
          break;
        case 'sorted':
          beep(523.25, 0.08, 0.028, 'triangle');
          beep(659.25, 0.1, 0.024, 'triangle');
          beep(783.99, 0.14, 0.02, 'sine');
          break;
      }
    },
    [ensureContext, isEnabled, isUnlocked]
  );

  const playStepSound = useCallback(
    (step: SortStep) => {
      const states = Object.values(step.states);
      if (states.includes('sorted')) {
        playTone('sorted');
        return;
      }
      if (states.includes('swap')) {
        playTone('swap');
        return;
      }
      if (states.includes('pivot')) {
        playTone('pivot');
        return;
      }
      if (states.includes('compare')) {
        playTone('compare');
      }
    },
    [playTone]
  );

  const toggle = useCallback(() => setIsEnabled((current) => !current), []);

  return { isEnabled, isUnlocked, toggle, unlock, playStepSound };
}
