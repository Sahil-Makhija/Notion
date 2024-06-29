"use client";

import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createDocument } from "@/actions";
import { useRevalidate } from "@/lib/hooks";

import { Item, ItemProps } from "./item";

export const NewPageItem = ({
  icon,
  label,
  className,
}: Pick<ItemProps, "icon" | "label" | "onClick" | "className">) => {
  const router = useRouter();
  const { revalidate } = useRevalidate();

  const { execute: create } = useServerAction(createDocument, {
    onSuccess: ({ data: document }) => {
      toast.success("New note created.");
      revalidate(`nav-docs-${document.parentDocument || "undefined"}`);
      router.push(`/documents/${document.id}`);
    },
    onError: () => toast.error("Failed to create a note."),
  });
  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, { loading: "Creating a new note...." });
  };
  return (
    <Item
      className={className}
      label={label}
      icon={icon}
      onClick={handleCreate}
    />
  );
};
