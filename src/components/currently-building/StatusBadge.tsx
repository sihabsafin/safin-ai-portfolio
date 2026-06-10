import React from "react";
import { cn } from "@/lib/utils";

type Status = "production" | "live" | "building" | "research" | "experimental" | "beta";

const statusConfig: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  production: {
    label: "Production Ready",
    dot: "bg-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    text: "text-emerald-400",
  },
  live: {
    label: "Live",
    dot: "bg-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    text: "text-emerald-400",
  },
  building: {
    label: "Building",
    dot: "bg-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
    text: "text-sky-400",
  },
  research: {
    label: "Research",
    dot: "bg-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    text: "text-violet-400",
  },
  experimental: {
    label: "Experimental",
    dot: "bg-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
    text: "text-orange-400",
  },
  beta: {
    label: "Private Beta",
    dot: "bg-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    text: "text-amber-400",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = React.memo(({ status, className }: StatusBadgeProps) => {
  const cfg = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border",
        cfg.bg,
        cfg.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", cfg.dot)} />
      {cfg.label}
    </span>
  );
});
StatusBadge.displayName = "StatusBadge";