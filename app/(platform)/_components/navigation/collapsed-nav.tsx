import { MenuIcon } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Navbar } from "./navbar";

interface CollapsedNavProps {
  className?: string;
  isCollapsed: boolean;
  resetWidth: () => void;
}

export const CollapsedNav = forwardRef<HTMLDivElement, CollapsedNavProps>(
  ({ className, isCollapsed, resetWidth }, ref) => {
    const params = useParams();
    return (
      <>
        <div ref={ref} style={{ zIndex: 999 }} className={className}>
          {!!params.documentId ? (
            <>
              <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
            </>
          ) : (
            <nav
              className={cn(
                "w-full bg-transparent px-3 py-2",
                !isCollapsed && "p-0",
              )}
            >
              {isCollapsed && (
                <MenuIcon
                  onClick={resetWidth}
                  role="button"
                  className="h-6 w-6 text-muted-foreground"
                />
              )}
            </nav>
          )}
        </div>
      </>
    );
  },
);

CollapsedNav.displayName = "CollapsedNav";
