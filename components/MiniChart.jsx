import clsx from "clsx";

export default function MiniChart({ points, trend = "up", compact = false }) {
  return (
    <svg viewBox="0 0 124 44" className={clsx(compact ? "h-7 w-20" : "h-12 w-full")} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={trend === "up" ? "#00c48c" : "#ef4665"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mini-chart"
      />
    </svg>
  );
}
