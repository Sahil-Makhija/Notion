"use client";

import { useUser } from "@clerk/nextjs";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import Image from "next/image";
import { useCallback } from "react";

import { createDocument } from "@/actions";
import { useRevalidate } from "@/lib/hooks";
import { Button } from "@/components/ui";

const DocumentsPage = () => {
  const { user } = useUser();
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        alt="empty"
        height="300"
        width="300"
        priority
        className="h-auto dark:hidden"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <CreateNoteButton />
    </div>
  );
};

export default DocumentsPage;

const CreateNoteButton = () => {
  const { revalidate } = useRevalidate();
  const { execute } = useServerAction(createDocument, {
    onSuccess: ({ data }) => {
      revalidate(`nav-docs-${data.parentDocument || "undefined"}`);
      toast.success("New note created!");
    },
    onError: () => toast.error("Failed to create a new note."),
  });

  const onCreate = useCallback(() => {
    execute({ title: "Untitled" });
  }, [execute]);

  return (
    <Button onClick={onCreate}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Create a note
    </Button>
  );
};
