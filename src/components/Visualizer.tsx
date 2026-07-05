import { useEffect, useRef, useState } from 'react';
import type { BarState } from '../types';

interface VisualizerProps {
  array: number[];
  states: Record<number, BarState>;
}

const STATE_COLORS: Record<BarState, string> = {
  idle: '#3b4a5a',
  compare: '#e8b339',
  swap: '#ef5b5b',
  sorted: '#3ddc97',
  pivot: '#7c8cff',
};

export function Visualizer({ array, states }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      setContainerSize({ width, height });
    };

    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = containerSize;
    if (!canvas || !width || !height) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const background = ctx.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, '#0f1620');
    background.addColorStop(1, '#090d12');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.lineWidth = 1;
    const gridSize = Math.max(28, Math.round(width / 14));
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }

    const n = array.length;
    if (n === 0) return;

    const gap = Math.max(1, Math.min(4, Math.floor(width / (n * 24))));
    const barWidth = Math.max((width - gap * (n - 1)) / n, 1);
    const maxValue = Math.max(...array, 1);
    const padding = Math.max(10, Math.round(height * 0.04));
    const usableHeight = height - padding * 2;

    array.forEach((value, i) => {
      const barHeight = (value / maxValue) * usableHeight;
      const x = i * (barWidth + gap);
      const y = height - padding - barHeight;
      const state = states[i] ?? 'idle';
      const color = STATE_COLORS[state];

      ctx.shadowColor = state === 'idle' ? 'transparent' : color;
      ctx.shadowBlur = state === 'idle' ? 0 : 18;
      ctx.fillStyle = color;
      const radius = Math.min(8, barWidth / 2);

      ctx.beginPath();
      const roundRect = ctx.roundRect;
      if (typeof roundRect === 'function') {
        roundRect.call(ctx, x, y, barWidth, barHeight, [radius, radius, 0, 0]);
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [array, containerSize, states]);

  return (
    <div
      ref={containerRef}
      className="relative h-[clamp(18rem,42vw,28rem)] w-full overflow-hidden rounded-[1.5rem] border border-base-border bg-base-panel shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:h-[clamp(20rem,40vw,30rem)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,140,255,0.14),transparent_42%),radial-gradient(circle_at_bottom,rgba(61,220,151,0.1),transparent_38%)]" />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
