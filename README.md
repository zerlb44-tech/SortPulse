# sortlab — Interactive Sorting Algorithm Visualizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A canvas-based visualizer for comparing how classic sorting algorithms behave step by step: **Bubble Sort**, **Merge Sort**, **Quick Sort**, and **Heap Sort**.

![demo placeholder](docs/demo.gif)
> Replace `docs/demo.gif` with a real screen recording of the app before publishing.

## Features

- 🎛️ Play / Pause / Step / Reset / Shuffle controls
- 🎚️ Adjustable array size (5–150 elements) and playback speed
- 🎨 Smooth canvas rendering with color-coded comparisons, swaps, pivots, and sorted state
- 🌗 Dark / light mode toggle (persisted to `localStorage`)
- 📊 Live comparison and swap counters, plus Big-O complexity reference per algorithm
- 📱 Fully responsive, down to small mobile screens
- ♿ Respects `prefers-reduced-motion`

## Tech Stack

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) for dev server and bundling
- [Tailwind CSS](https://tailwindcss.com) for styling
- [lucide-react](https://lucide.dev) for icons
- Native `<canvas>` for rendering — no charting library

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm / yarn, adjust commands accordingly)

### Install & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Project Structure

```
algo-visualizer/
├── src/
│   ├── algorithms/        # Generator-based sorting implementations
│   │   ├── bubbleSort.ts
│   │   ├── mergeSort.ts
│   │   ├── quickSort.ts
│   │   ├── heapSort.ts
│   │   └── index.ts       # Registry + complexity metadata
│   ├── components/
│   │   ├── Visualizer.tsx       # Canvas renderer
│   │   ├── Controls.tsx         # Playback + sliders
│   │   ├── AlgorithmSelector.tsx
│   │   ├── StatsPanel.tsx
│   │   └── Legend.tsx
│   ├── hooks/
│   │   ├── useSort.ts      # Drives generator playback with setTimeout
│   │   └── useDarkMode.ts
│   ├── types/index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## How it works

Each algorithm is implemented as a JavaScript **generator function** that yields a `SortStep` (a snapshot of the array plus which indices are being compared, swapped, or finalized) every time it would otherwise mutate state. The `useSort` hook pulls one step at a time on an interval controlled by the speed slider, so the same algorithm code powers both instant execution and the animated walkthrough — nothing is faked or pre-recorded.

## Algorithms Included

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

## Contributing

Issues and pull requests are welcome. To add a new algorithm:

1. Create `src/algorithms/yourSort.ts` exporting a `SortGenerator`.
2. Register it (and its complexity metadata) in `src/algorithms/index.ts`.
3. It will automatically appear in the algorithm selector.

## License

MIT — see [LICENSE](LICENSE).
