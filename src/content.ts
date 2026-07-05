import type { AlgorithmId, AlgorithmMeta } from './types';

export type Language = 'en' | 'ru' | 'zh';

export interface LocaleContent {
  nav: {
    tagline: string;
    github: string;
    soundOn: string;
    soundOff: string;
    theme: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    commandLabel: string;
    commandHint: string;
    stats: Array<{ value: string; label: string }>;
    highlights: Array<{ title: string; description: string }>;
  };
  controls: {
    speed: string;
    size: string;
    play: string;
    pause: string;
    step: string;
    reset: string;
    shuffle: string;
  };
  legend: Array<{ label: string }>;
  status: {
    done: string;
    sorting: string;
    paused: string;
  };
  stats: {
    best: string;
    average: string;
    worst: string;
    space: string;
    comparisons: string;
    swaps: string;
    status: string;
    sorted: string;
    running: string;
  };
  algorithms: Record<AlgorithmId, AlgorithmMeta>;
  footer: string;
}

const metaBase: Record<AlgorithmId, Omit<AlgorithmMeta, 'description'>> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
  },
};

function buildAlgorithms(
  descriptions: Record<AlgorithmId, string>
): Record<AlgorithmId, AlgorithmMeta> {
  return Object.fromEntries(
    (Object.keys(metaBase) as AlgorithmId[]).map((id) => [
      id,
      {
        ...metaBase[id],
        description: descriptions[id],
      },
    ])
  ) as Record<AlgorithmId, AlgorithmMeta>;
}

export const locales: Record<Language, LocaleContent> = {
  en: {
    nav: {
      tagline: 'sorting algorithm visualizer',
      github: 'View source on GitHub',
      soundOn: 'Disable sound',
      soundOff: 'Enable sound',
      theme: 'Toggle theme',
    },
    hero: {
      badge: 'Audio + motion tuned for learning',
      title: 'Watch sorting algorithms think.',
      description:
        'Step through Bubble, Merge, Quick, and Heap sort bar by bar. The motion is calm, the sounds are soft, and the layout is built to stay readable on desktop and mobile.',
      primaryCta: 'Start with one command',
      secondaryCta: 'No build noise, just a clean run',
    },
    about: {
      badge: 'About this project',
      title: 'Designed like a product, not just a demo.',
      description:
        'SortPulse is built to look good on GitHub, feel smooth in the browser, and explain sorting algorithms without making the interface feel heavy. The motion is deliberate: soft, readable, and helpful.',
      commandLabel: 'npm start',
      commandHint: 'Launches the app locally',
      stats: [
        { value: '4', label: 'algorithms' },
        { value: '100%', label: 'real steps' },
        { value: '1', label: 'start command' },
      ],
      highlights: [
        {
          title: 'One-command launch',
          description: 'Run `npm start` after installing once, and the project opens as a local app.',
        },
        {
          title: 'Built to be shared',
          description: 'The repo includes better metadata, icons, and social preview assets for GitHub.',
        },
        {
          title: 'Real algorithm steps',
          description: 'The visualizer is driven by generator steps, so what you see matches the logic.',
        },
        {
          title: 'Product-style polish',
          description: 'Animated surfaces, responsive layout, and subtle motion make the app feel finished.',
        },
      ],
    },
    controls: {
      speed: 'Speed',
      size: 'Size',
      play: 'Play',
      pause: 'Pause',
      step: 'Step forward',
      reset: 'Reset',
      shuffle: 'New random array',
    },
    legend: [{ label: 'Idle' }, { label: 'Comparing' }, { label: 'Swapping' }, { label: 'Pivot' }, { label: 'Sorted' }],
    status: {
      done: 'Done - array sorted',
      sorting: 'Sorting...',
      paused: 'Paused',
    },
    stats: {
      best: 'Best',
      average: 'Average',
      worst: 'Worst',
      space: 'Space',
      comparisons: 'Comparisons',
      swaps: 'Swaps',
      status: 'Status',
      sorted: 'Sorted',
      running: 'Running',
    },
    algorithms: buildAlgorithms({
      bubble: 'Repeatedly steps through the list, swapping adjacent elements that are out of order.',
      merge: 'Divides the array into halves, sorts each recursively, then merges the sorted halves.',
      quick: 'Picks a pivot and partitions the array around it, then recursively sorts each side.',
      heap: 'Builds a max-heap, then repeatedly extracts the maximum to the end of the array.',
    }),
    footer: 'Built with React, TypeScript, Vite, and Tailwind CSS.',
  },
  ru: {
    nav: {
      tagline: 'визуализатор алгоритмов сортировки',
      github: 'Открыть код на GitHub',
      soundOn: 'Выключить звук',
      soundOff: 'Включить звук',
      theme: 'Переключить тему',
    },
    hero: {
      badge: 'Звук + анимация для обучения',
      title: 'Смотри, как алгоритмы сортировки думают.',
      description:
        'Пошагово проходи Bubble, Merge, Quick и Heap sort. Анимация спокойная, звук мягкий, а интерфейс остаётся читаемым и на компьютере, и на телефоне.',
      primaryCta: 'Запуск в одну команду',
      secondaryCta: 'Без лишнего шума, просто чистый старт',
    },
    about: {
      badge: 'Об этом проекте',
      title: 'Как продукт, а не как черновик.',
      description:
        'SortPulse сделан так, чтобы хорошо выглядеть на GitHub, плавно работать в браузере и понятно объяснять алгоритмы сортировки. Движение здесь намеренное: мягкое, читаемое и полезное.',
      commandLabel: 'npm start',
      commandHint: 'Запускает приложение локально',
      stats: [
        { value: '4', label: 'алгоритма' },
        { value: '100%', label: 'реальные шаги' },
        { value: '1', label: 'команда запуска' },
      ],
      highlights: [
        {
          title: 'Запуск одной командой',
          description: 'После установки достаточно `npm start`, и проект откроется как локальное приложение.',
        },
        {
          title: 'Готово для шаринга',
          description: 'В репозитории уже есть метаданные, иконки и preview-картинка для GitHub.',
        },
        {
          title: 'Настоящие шаги алгоритма',
          description: 'Визуализация идёт из генератора шагов, поэтому отображение соответствует логике.',
        },
        {
          title: 'Взрослая подача',
          description: 'Анимации, responsive-верстка и мягкие эффекты делают проект законченным.',
        },
      ],
    },
    controls: {
      speed: 'Скорость',
      size: 'Размер',
      play: 'Старт',
      pause: 'Пауза',
      step: 'Шаг вперёд',
      reset: 'Сброс',
      shuffle: 'Новый массив',
    },
    legend: [
      { label: 'Покой' },
      { label: 'Сравнение' },
      { label: 'Перестановка' },
      { label: 'Опорный' },
      { label: 'Готово' },
    ],
    status: {
      done: 'Готово - массив отсортирован',
      sorting: 'Сортировка...',
      paused: 'Пауза',
    },
    stats: {
      best: 'Лучший',
      average: 'Средний',
      worst: 'Худший',
      space: 'Память',
      comparisons: 'Сравнения',
      swaps: 'Перестановки',
      status: 'Статус',
      sorted: 'Отсортировано',
      running: 'В процессе',
    },
    algorithms: buildAlgorithms({
      bubble: 'Многократно проходит по массиву и меняет местами соседние элементы, если они стоят не по порядку.',
      merge: 'Делит массив пополам, рекурсивно сортирует части и затем объединяет их.',
      quick: 'Выбирает опорный элемент, делит массив вокруг него и рекурсивно сортирует обе части.',
      heap: 'Строит max-heap, а затем по очереди переносит максимум в конец массива.',
    }),
    footer: 'Создано на React, TypeScript, Vite и Tailwind CSS.',
  },
  zh: {
    nav: {
      tagline: '排序算法可视化器',
      github: '在 GitHub 查看源码',
      soundOn: '关闭声音',
      soundOff: '开启声音',
      theme: '切换主题',
    },
    hero: {
      badge: '声音 + 动效，专为学习而调校',
      title: '看排序算法“思考”。',
      description:
        '逐步观察 Bubble、Merge、Quick 和 Heap 排序。动效更柔和，声音更克制，界面在桌面和手机上都保持清晰易读。',
      primaryCta: '一条命令启动',
      secondaryCta: '没有多余噪音，只有干净的运行体验',
    },
    about: {
      badge: '关于项目',
      title: '像成品，而不是像演示稿。',
      description:
        'SortPulse 的目标是让它在 GitHub 上好看、在浏览器里顺滑，并且清楚地解释排序算法。这里的动效是有意设计的：柔和、清晰、实用。',
      commandLabel: 'npm start',
      commandHint: '在本地启动应用',
      stats: [
        { value: '4', label: '种算法' },
        { value: '100%', label: '真实步骤' },
        { value: '1', label: '启动命令' },
      ],
      highlights: [
        {
          title: '一条命令启动',
          description: '安装一次后运行 `npm start`，即可把项目作为本地应用打开。',
        },
        {
          title: '为分享而生',
          description: '仓库已包含更好的元数据、图标和社交预览素材，适合 GitHub 展示。',
        },
        {
          title: '真实算法步骤',
          description: '可视化直接驱动于生成器步骤，因此看到的内容和算法逻辑一致。',
        },
        {
          title: '产品级打磨',
          description: '动效、响应式布局和柔和过渡让应用更像一款完整产品。',
        },
      ],
    },
    controls: {
      speed: '速度',
      size: '大小',
      play: '播放',
      pause: '暂停',
      step: '单步',
      reset: '重置',
      shuffle: '新数组',
    },
    legend: [
      { label: '空闲' },
      { label: '比较' },
      { label: '交换' },
      { label: '主元' },
      { label: '完成' },
    ],
    status: {
      done: '完成 - 数组已排序',
      sorting: '排序中...',
      paused: '已暂停',
    },
    stats: {
      best: '最好',
      average: '平均',
      worst: '最差',
      space: '空间',
      comparisons: '比较次数',
      swaps: '交换次数',
      status: '状态',
      sorted: '已排序',
      running: '运行中',
    },
    algorithms: buildAlgorithms({
      bubble: '反复遍历数组，若相邻元素顺序错误就交换它们。',
      merge: '将数组不断二分，递归排序后再把有序部分合并起来。',
      quick: '选择一个主元，按它划分数组，再递归排序两侧。',
      heap: '先构建最大堆，再不断把最大值取到数组末尾。',
    }),
    footer: '基于 React、TypeScript、Vite 和 Tailwind CSS 构建。',
  },
};
