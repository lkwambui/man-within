import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  copy,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const titleColor = tone === "dark" ? "text-ivory" : "text-ink";
  const copyColor = tone === "dark" ? "text-ivory/70" : "text-ink/60";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? <p className="section-kicker mb-3">{kicker}</p> : null}
      <h2 className={cn("section-title", titleColor)}>{title}</h2>
      {copy ? <p className={cn("mt-3 text-lg leading-relaxed", copyColor)}>{copy}</p> : null}
    </div>
  );
}