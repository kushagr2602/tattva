// Pure decorative SVGs — no state, safe in server or client components.

// Toran — a hanging garland strip across the top of the hero, echoing the
// marigold-and-leaf torans strung over a doorway at a wedding or Diwali.
export function Toran() {
  const n = 48;
  const colors = ["#d39b32", "#b5813a", "#a8455f", "#7f8a4a"]; // marigold, brass, rose, leaf
  return (
    <svg className="toran" viewBox="0 0 1200 84" preserveAspectRatio="none" aria-hidden>
      {Array.from({ length: n }).map((_, i) => {
        const x = (i * 1200) / (n - 1);
        const len = 40 + (i % 3) * 9 + (i % 2 ? 8 : 0);
        const c = colors[i % colors.length];
        return (
          <g key={i}>
            <line x1={x} y1={0} x2={x} y2={len} stroke="#8a6d2c" strokeWidth={1} opacity={0.5} />
            {Array.from({ length: 3 }).map((_, j) => (
              <circle key={j} cx={x} cy={12 + j * 9} r={2.6} fill={c} opacity={0.9} />
            ))}
            <path d={`M${x} ${len} q 4.5 7 0 15 q -4.5 -8 0 -15`} fill={c} opacity={0.85} />
          </g>
        );
      })}
    </svg>
  );
}

// Engraved-plate motif used as the photo placeholder and hero fallback.
export function Motif({ small }: { small?: boolean }) {
  const s = small ? 88 : 150;
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none" role="img" aria-label="motif">
      <circle cx="60" cy="60" r="46" stroke="var(--brass)" strokeWidth="1" opacity="0.9" />
      <circle cx="60" cy="60" r="38" stroke="var(--brass)" strokeWidth="0.6" opacity="0.55" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <path
            key={i}
            d={`M60 60 q ${Math.cos(a) * 10 - Math.sin(a) * 14} ${Math.sin(a) * 10 + Math.cos(a) * 14} ${Math.cos(a) * 34} ${Math.sin(a) * 34}`}
            stroke="var(--brass)"
            strokeWidth="0.7"
            opacity="0.7"
          />
        );
      })}
      <circle cx="60" cy="60" r="6" fill="var(--brass)" opacity="0.85" />
    </svg>
  );
}
