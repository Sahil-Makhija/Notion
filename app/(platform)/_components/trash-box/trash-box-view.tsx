"use client";

import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Document } from "@prisma/client";
import { Input } from "@/components/ui";
import { Spinner } from "@/components/shared";
import { useServerAction } from "zsa-react";
import { removeDocument } from "@/actions";
import { ConfirmModal } from "@/components/modals";
import { TrashItem } from "./trash-item";
import { useQueryClient } from "@tanstack/react-query";

interface TrashBoxViewProps {
  documents: Array<{ id: Document["id"]; title: Document["title"] }>;
}

export const TrashBoxView = ({ documents }: TrashBoxViewProps) => {
  const router = useRouter();
  const params = useParams();

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // const onRestore = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   documentId: Document["id"],
  // ) => {
  //   event.stopPropagation();
  //   const promise = restore({ id: documentId });

  //   toast.promise(promise, {
  //     loading: "Restoring note..",
  //     success: "Note restored!",
  //     error: "Failed to restore note.",
  //   });
  // };

  const queryClient = useQueryClient();

  const { execute: remove } = useServerAction(removeDocument, {
    onSuccess: () => {
      toast.success("Note deleted!");
      queryClient.invalidateQueries({
        queryKey: ["archived-notes"],
      });
    },
    onError: () => toast.error("Failed to delete note."),
  });

  const onRemove = (documentId: Document["id"]) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note..",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div
        className="flex h-full items-center justify-center p-4"
        aria-busy="true"
        aria-label="loading"
      >
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <section className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
          aria-label="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        {filteredDocuments?.length === 0 && (
          <p className="pb-2 text-center text-xs text-muted-foreground">
            No documents found.
          </p>
        )}
        {filteredDocuments?.map((document) => (
          <TrashItem
            key={document.id}
            {...document}
            onClick={onClick}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
};
