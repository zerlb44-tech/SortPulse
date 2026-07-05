# SortPulse

A polished, interactive sorting algorithm visualizer built with React, TypeScript, Tailwind CSS, and Canvas.

[![Live demo](https://img.shields.io/badge/live-demo-7c8cff?style=for-the-badge)](https://github.com/zerlb44-tech/fdsed)
[![License: MIT](https://img.shields.io/badge/License-MIT-3ddc97?style=for-the-badge)](LICENSE)
[![CI](https://github.com/zerlb44-tech/fdsed/actions/workflows/ci.yml/badge.svg)](https://github.com/zerlb44-tech/fdsed/actions/workflows/ci.yml)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)

## Overview

SortPulse turns classic sorting algorithms into a visual story. Each algorithm emits real step data, and the UI renders those steps on a canvas with color-coded states, subtle sound feedback, and a responsive interface that still feels good on small screens.

The current build includes:

- Bubble Sort
- Merge Sort
- Quick Sort
- Heap Sort

## Why this project stands out

- Real algorithm steps, not pre-recorded animation
- Web Audio feedback for compare, swap, pivot, and completion states
- Responsive layout with a more intentional visual style
- Dark and light theme support
- Canvas rendering that keeps the interface lightweight
- Clear complexity stats for each algorithm

## Demo

Add a short GIF or MP4 here when you publish the project:

`docs/demo.gif`

## Screenshots

Recommended assets to add before promoting the repo:

- `docs/demo.gif` or `docs/demo.mp4`
- `docs/screenshot-dark.png`
- `docs/screenshot-light.png`

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install once

```bash
npm install
```

### Launch in one command

```bash
npm start
```

### Production build

```bash
npm run build
npm run preview
```

### One-line launch

If you prefer a single shell line for first-time setup:

```bash
npm install && npm start
```

## Controls

- Play and pause the animation
- Step through the algorithm manually
- Shuffle the array
- Change array size and playback speed
- Toggle sound
- Switch between light and dark modes

## Project Structure

```text
src/
  algorithms/        Generator-based sorting implementations
  components/        UI building blocks
  hooks/             Playback, audio, and theme logic
  types/             Shared TypeScript types
  App.tsx            Main composition layer
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Native Canvas API
- Web Audio API

## SEO and Sharing

The app now includes better page metadata and Open Graph-friendly assets so the GitHub repo and any deployed demo look more polished when shared.

## Make the GitHub repo stronger

The best improvements for a public repo are usually simple and visible:

- A strong name and short description
- A screenshot or GIF near the top of the README
- A live demo link
- A clear one-command start path
- CI that runs lint and build on every push
- A concise features list
- A roadmap that shows the project is active
- Social preview assets so the repo looks good when shared
- Topic keywords in GitHub repository settings

## Roadmap

- Add a short narrated demo clip
- Publish GitHub Pages deployment
- Add more algorithms
- Add shareable URLs for presets
- Capture before/after performance screenshots for mobile
- Add more launch screenshots for README and social posts

## Contributing

Contributions are welcome.

If you want to add a new algorithm:

1. Create a generator in `src/algorithms/`.
2. Register it in `src/algorithms/index.ts`.
3. Add its metadata to the same registry.
4. The selector will pick it up automatically.

## License

MIT. See [LICENSE](LICENSE).
