"use client";

import { useEffect, useMemo, useState } from "react";

const pad = (value: number) => value.toString().padStart(2, "0");

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);

  return {
    total: diff,
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string | Date }) {
  const target = useMemo(() => {
    if (targetDate instanceof Date) return targetDate;
    const parsed = new Date(targetDate);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(target));

  useEffect(() => {
    setTimeLeft(getTimeRemaining(target));
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const hasEnded = timeLeft.total <= 0;

  if (hasEnded) {
    return (
      <div className="flex items-center justify-center">
        <p className="font-mono text-3xl font-medium tracking-[0.3em] text-[#f5f5f5]">
          00:00:00:00
        </p>
      </div>
    );
  }

  const segments = [
    { label: "Days", value: pad(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center justify-center font-mono text-4xl font-semibold tracking-[0.3em] text-[#f5f5f5] sm:text-5xl">
      {segments.map((segment, index) => (
        <span key={segment.label} className="flex items-center">
          <span>{segment.value}</span>
          {index < segments.length - 1 ? (
            <span className="mx-2 text-[#737373]">:</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
