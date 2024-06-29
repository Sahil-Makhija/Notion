"use client";

import { useUser } from "@clerk/nextjs";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Document } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Skeleton,
} from "@/components/ui";
import { useServerAction } from "zsa-react";
import { archiveDocument } from "@/actions";
import { useRevalidate } from "@/lib/hooks";

interface MenuProps {
  documentId: Document["id"];
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const { revalidate } = useRevalidate();

  const { execute: archive } = useServerAction(archiveDocument, {
    onSuccess: ({ data }) => {
      toast.success("Note moved to trash!");
      revalidate([data.id, `nav-docs-${data.parentDocument || "undefined"}`]);
    },
    onError: () => toast.error("Failed to archive note."),
  });

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Last edited by {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-8 w-8" />;
};
