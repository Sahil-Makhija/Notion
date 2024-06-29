"use client";

import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Document } from "@prisma/client";
import { fetcher } from "@/lib/utils";

import { Title } from "./title";
import { Banner } from "./banner";

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { useQuery } from "convex/react";
// import { Title } from "./Title";
// import { Banner } from "./Banner";
// import { Menu } from "./Menu";
// import { Publish } from "./Publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const { data: document, isLoading } = useQuery<Document>({
    queryKey: [params.documentId as Document["id"]],
    queryFn: () =>
      fetcher(`/api/documents/${params.documentId as Document["id"]}`),
  });

  if (isLoading) {
    return (
      <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          {/* <Menu.Skeleton /> */}
        </div>
      </nav>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-2 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <button aria-label="Menu">
            <MenuIcon
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          </button>
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            {/* <Publish initialData={document} />
            <Menu documentId={document.id} /> */}
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document.id} />}
    </>
  );
};
