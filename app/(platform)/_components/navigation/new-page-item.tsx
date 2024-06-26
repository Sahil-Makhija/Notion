"use client";

import { useServerAction } from "zsa-react";
import { Item, ItemProps } from "./item";
import { createDocument } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const NewPageItem = ({
  icon,
  label,
  className,
}: Pick<ItemProps, "icon" | "label" | "onClick" | "className">) => {
  const router = useRouter();

  const { execute: create } = useServerAction(createDocument, {
    onSuccess: ({ data: document }) => {
      toast.success("New note created.");
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
