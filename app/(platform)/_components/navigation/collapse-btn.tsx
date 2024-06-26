import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";

export const CollapseButton = ({
  isMobile,
  onClick,
}: {
  isMobile: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "absolute right-2 top-3 size-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
        isMobile && "opacity-100",
      )}
    >
      <ChevronsLeft className="h-6 w-6" />
    </div>
  );
};
