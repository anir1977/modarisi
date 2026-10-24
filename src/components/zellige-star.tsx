/** Eight-point Moroccan star (two squares rotated 45°), used as the logo mark. */
export function ZelligeMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round">
        <rect x="20" y="20" width="60" height="60" />
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="9" fill="var(--saffron)" />
    </svg>
  );
}

/**
 * Hero centrepiece: a layered zellige star rotating slowly in CSS 3D, with a chalk glow.
 * Pure CSS (no WebGL), so it costs almost nothing on low-end phones; motion stops when
 * the user prefers reduced motion.
 */
export function ZelligeStar3D() {
  const layers = [
    { z: -60, scale: 1.18, opacity: 0.18 },
    { z: -30, scale: 1.08, opacity: 0.35 },
    { z: 0, scale: 1, opacity: 1 },
    { z: 30, scale: 0.78, opacity: 0.55 },
    { z: 60, scale: 0.52, opacity: 0.85 },
  ];
  return (
    <div className="zs-stage" aria-hidden="true">
      <div className="zs-glow" />
      <div className="zs-rotor">
        {layers.map((l, i) => (
          <div
            key={i}
            className="zs-layer"
            style={{ transform: `translateZ(${l.z}px) scale(${l.scale})`, opacity: l.opacity }}
          >
            <span className="zs-square" />
            <span className="zs-square zs-square--tilt" />
          </div>
        ))}
        <span className="zs-core" />
      </div>
    </div>
  );
}
