const ITEMS: { label: string; color: string }[] = [
  { label: 'Idle', color: '#3b4a5a' },
  { label: 'Comparing', color: '#e8b339' },
  { label: 'Swapping', color: '#ef5b5b' },
  { label: 'Pivot', color: '#7c8cff' },
  { label: 'Sorted', color: '#3ddc97' },
];

export function Legend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-slate-400">
      {ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm shadow-[0_0_10px_currentColor]" style={{ backgroundColor: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  );
}
