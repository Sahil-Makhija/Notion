"use client";

import { useMediaQuery } from "usehooks-ts";

import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CollapseButton } from "./collapse-btn";
import { ResizeDiv } from "./resize-div";
import { NavbarActions } from "./navbar-actions";
import { NavDocuments } from "./nav-documents";
import { CollapsedNav } from "./collapsed-nav";

export const Navigation = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) collapse();
    else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [isMobile, pathname]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;
    if (newWidth < 256) newWidth = 256;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "256px";
      navbarRef.current.style.removeProperty("width");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-256px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "256px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  if (!isMounted) {
    return null;
  }

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
        <CollapseButton onClick={collapse} isMobile={isMobile} />
        <ResizeDiv onMouseDown={handleMouseDown} resetWidth={resetWidth} />
        <NavbarActions />
        <NavDocuments isMobile={isMobile} />
      </aside>
      <CollapsedNav
        ref={navbarRef}
        isCollapsed={isCollapsed}
        resetWidth={resetWidth}
        className={cn(
          "absolute left-64 top-0 w-[calc(100%-256px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      />
    </>
  );
};
