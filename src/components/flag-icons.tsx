'use client';

/* Inline SVG flag components — no external deps, no emojis */
/* All coordinates are pre-computed to avoid SSR/client hydration mismatches */

export function GermanyFlag({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="8" fill="#000000" />
      <rect y="8" width="36" height="8" fill="#DD0000" />
      <rect y="16" width="36" height="8" fill="#FFCC00" />
    </svg>
  );
}

export function UAEFlag({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="8" fill="#00732F" />
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      <rect y="16" width="36" height="8" fill="#000000" />
      <rect width="9" height="24" fill="#FF0000" />
    </svg>
  );
}

/* Pre-computed 21 sun rays for the Kurdish flag (avoids Math.cos/sin SSR mismatch) */
const KURD_SUN_RAYS = [
  [3.20, 0.00, 5.50, 0.00],
  [3.06, 0.94, 5.26, 1.63],
  [2.66, 1.83, 4.58, 3.16],
  [2.02, 2.60, 3.47, 4.49],
  [1.17, 3.18, 2.02, 5.50],
  [0.19, 3.54, 0.32, 6.12],
  [-0.86, 3.66, -1.48, 6.33],
  [-1.87, 3.51, -3.24, 6.07],
  [-2.77, 3.12, -4.78, 5.39],
  [-3.51, 2.50, -6.07, 4.33],
  [-4.06, 1.69, -7.04, 2.93],
  [-4.37, 0.74, -7.57, 1.28],
  [-4.43, -0.29, -7.67, -0.50],
  [-4.21, -1.30, -7.29, -2.26],
  [-3.74, -2.23, -6.47, -3.86],
  [-3.02, -3.02, -5.24, -5.24],
  [-2.11, -3.64, -3.65, -6.31],
  [-1.06, -4.04, -1.83, -6.99],
  [0.08, -4.21, 0.14, -7.29],
  [1.22, -4.13, 2.12, -7.16],
  [2.29, -3.81, 3.97, -6.60],
];

export function KurdistanFlag({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="8" fill="#ED2024" />
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      <rect y="16" width="36" height="8" fill="#009639" />
      <g transform="translate(18, 12)">
        <circle r="3" fill="#FCDD09" />
        {KURD_SUN_RAYS.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FCDD09"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
