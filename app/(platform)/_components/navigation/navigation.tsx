import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { CollapseButton } from "./collapse-btn";
import { ResizeDiv } from "./resize-div";

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <>
      <aside
        ref={sidebarRef}
        style={{ zIndex: 999 }}
        className={cn(
          "group/sidebar relative flex h-full w-64 flex-col overflow-y-auto border bg-secondary",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <CollapseButton isMobile={isMobile} />
        <ResizeDiv />
        <div
          ref={navbarRef}
          style={{
            zIndex: 999,
            width: "calc(100%-240px)",
          }}
          className={cn(
            "absolute left-60 top-0",
            isResetting && "transition-all duration-300 ease-in-out",
            isMobile && "left-0 w-full",
          )}
        >
          <nav
            className={cn(
              "w-full bg-transparent px-3 py-2",
              !isCollapsed && "p-0",
            )}
          >
            {isCollapsed && (
              <MenuIcon
                // onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};
