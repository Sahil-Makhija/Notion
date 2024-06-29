"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Document } from "@prisma/client";
import { Button } from "@/components/ui";
import { ConfirmModal } from "@/components/modals";
import { useServerAction } from "zsa-react";
import { removeDocument, restoreDocument } from "@/actions";
import { useRevalidate } from "@/lib/hooks";

interface BannerProps {
  documentId: Document["id"];
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const { revalidate } = useRevalidate();

  const { execute: remove } = useServerAction(removeDocument, {
    onSuccess: () => {
      toast.success("Note Deleted!");
    },
    onError: () => toast.error("Failed to delete note."),
  });
  const { execute: restore } = useServerAction(restoreDocument, {
    onSuccess: ({ data }) => {
      toast.success("Note restored!");
      revalidate([`nav-docs-${data.parentDocument || "undefined"}`, data.id]);
    },
    onError: () => toast.error("Failed to restore note."),
  });

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>
        This page is in the <span className="font-bold">Trash.</span>
      </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white transition hover:bg-white hover:text-rose-500"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white transition hover:bg-white hover:text-rose-500"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
