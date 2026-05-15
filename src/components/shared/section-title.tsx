import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
