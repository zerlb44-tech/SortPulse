import { ArrowRight, Code2, Layers3, Rocket, Sparkles } from 'lucide-react';

const highlights = [
  {
    title: 'One-command launch',
    description: 'Run `npm start` after installing once, and the project opens as a local app.',
    icon: Rocket,
  },
  {
    title: 'Built to be shared',
    description: 'The repo includes better metadata, icons, and social preview assets for GitHub.',
    icon: Sparkles,
  },
  {
    title: 'Real algorithm steps',
    description: 'The visualizer is driven by generator steps, so what you see matches the logic.',
    icon: Code2,
  },
  {
    title: 'Product-style polish',
    description: 'Animated surfaces, responsive layout, and subtle motion make the app feel finished.',
    icon: Layers3,
  },
];

const stats = [
  { value: '4', label: 'algorithms' },
  { value: '100%', label: 'real steps' },
  { value: '1', label: 'start command' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-[linear-gradient(145deg,rgba(17,22,29,0.96),rgba(9,13,18,0.9))] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-7 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-6 h-40 w-40 rounded-full bg-signal-pivot/10 blur-3xl motion-safe:animate-glow" />
        <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-signal-sorted/10 blur-2xl motion-safe:animate-float" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(124,140,255,0.4),transparent)] bg-[length:200%_100%] motion-safe:animate-shimmer" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full border border-signal-pivot/30 bg-signal-pivot/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-pivot">
            About this project
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Designed like a product, not just a demo.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            SortPulse is built to look good on GitHub, feel smooth in the browser, and explain sorting
            algorithms without making the interface feel heavy. The motion here is deliberate: soft,
            readable, and helpful.
          </p>

          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-base-border bg-black/20 px-4 py-2 text-sm text-slate-300">
            <span className="font-mono text-signal-sorted">npm start</span>
            <span className="text-slate-500">Launches the app locally</span>
            <ArrowRight size={16} className="text-signal-pivot" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-base-border bg-white/[0.03] p-4 motion-safe:animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="font-mono text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-base-border bg-base-panel p-4 transition duration-300 hover:-translate-y-1 hover:border-signal-pivot/40 hover:shadow-[0_14px_44px_rgba(0,0,0,0.24)] motion-safe:animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-pivot/10 text-signal-pivot transition group-hover:bg-signal-pivot group-hover:text-white">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
