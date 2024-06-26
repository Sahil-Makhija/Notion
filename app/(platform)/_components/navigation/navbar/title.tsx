import { useServerAction } from "zsa-react";
import { toast } from "sonner";

import React, { useRef, useState } from "react";

import { updateDocument } from "@/actions";
import { Document } from "@prisma/client";
import { useRevalidate } from "@/lib/hooks";
import { Button, Input, Skeleton } from "@/components/ui";

interface TitleProps {
  initialData: Document;
}

export const Title = ({ initialData }: TitleProps) => {
  const { revalidate } = useRevalidate();

  const { execute: update, isPending } = useServerAction(updateDocument, {
    onSuccess: () => {
      toast.success("Title updated!");
      revalidate([
        initialData.id,
        `nav-docs-${initialData.parentDocument || "undefined"}`,
      ]);
    },
    onError: () => {
      setTitle(initialData.title);
      toast.error("Failed to update title!");
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const inputRef = useRef<HTMLInputElement>(null);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disabledInput = () => {
    setIsEditing(false);
    const promise = update({
      id: initialData.id,
      title: title || "Untitled",
    });
    toast.promise(promise, { loading: "Updating title..." });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      disabledInput();
    }
  };

  if (isPending) {
    return <Title.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disabledInput}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={title}
          className="h-8 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="h-8 px-4 font-normal"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-8 w-40 rounded-md" />;
};
