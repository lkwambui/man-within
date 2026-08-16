import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  copy,
  action,
  icon,
}: {
  title: string;
  copy: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-ink/15 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-forest">
        {icon ?? <BookOpen size={24} />}
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">{title}</h2>
      <p className="mt-2 max-w-sm font-sans text-[15px] leading-relaxed text-ink/55">{copy}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}