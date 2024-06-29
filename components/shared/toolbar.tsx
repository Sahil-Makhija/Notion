"use client";

import { useServerAction } from "zsa-react";
import TextareaAutosize from "react-textarea-autosize";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

import { removeIcon as removeIconAction, updateDocument } from "@/actions";
import { useCoverImage, useRevalidate } from "@/lib/hooks";
import { Document } from "@prisma/client";

import { Button } from "../ui";
import { IconPicker } from "./icon-picker";

interface ToolbarProps {
  initialData: Document;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const { revalidate } = useRevalidate();

  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);

  const { execute: update } = useServerAction(updateDocument, {
    onSuccess: ({ data }) => {
      revalidate([
        data.id,
        `nav-docs-${initialData.parentDocument || "undefined"}`,
      ]);
    },
  });
  const { execute: removeIcon } = useServerAction(removeIconAction, {
    onSuccess: () => {
      revalidate([
        initialData.id,
        `nav-docs-${initialData.parentDocument || "undefined"}`,
      ]);
    },
  });
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
    update({
      id: initialData.id,
      title: title || "Untitled",
    });
  };

  const onInput = (value: string) => {
    setTitle(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData.id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData.id,
    });
  };

  return (
    <div className="group relative py-96 pl-12">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-2 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-xs text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          spellCheck="false"
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(e) => onInput(e.target.value)}
          className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="break-words pb-[.7188rem] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
