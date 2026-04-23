import { useEffect, useState } from "react";

export const Countdown = ({ expiresAt, onExpire }: { expiresAt: number; onExpire?: () => void }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const ms = Math.max(0, expiresAt - now);
  useEffect(() => {
    if (ms === 0) onExpire?.();
  }, [ms, onExpire]);

  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const urgent = ms > 0 && ms < 5 * 60 * 1000;

  if (ms === 0) return <span className="font-mono text-destructive">00:00:00</span>;
  return (
    <span className={`font-mono tabular-nums ${urgent ? "text-destructive animate-pulse" : "text-secondary dark:text-accent"}`}>
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
};
