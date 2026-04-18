"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number;           // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  gradient?: string;       // Tailwind gradient classes
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  gradient = "from-blue-500 to-cyan-500",
  animated = true,
  className = "",
}: ProgressBarProps) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    if (!animated) { setDisplayed(pct); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayed(pct);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, animated]);

  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };

  return (
    <div ref={ref} className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-white">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-white/5 rounded-full ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
          style={{ width: `${displayed}%` }}
        />
      </div>
    </div>
  );
}
