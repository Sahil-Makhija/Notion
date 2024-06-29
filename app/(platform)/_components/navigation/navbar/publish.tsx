"use client";

import { useServerAction } from "zsa-react";
import { Check, Copy, Globe } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { updateDocument } from "@/actions";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@/components/ui";
import { useOrigin, useRevalidate } from "@/lib/hooks";
import { Document } from "@prisma/client";

interface PublishProps {
  initialData: Document;
}

export const Publish = ({ initialData }: PublishProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const origin = useOrigin();
  const { revalidate } = useRevalidate();

  const { execute: update } = useServerAction(updateDocument, {
    onStart: () => setIsSubmitting(true),
    onFinish: () => setIsSubmitting(false),
    onSuccess: ({ data }) => revalidate(data.id),
  });

  const [copied, setCopied] = useState(false);

  const url = `${origin}/preview/${initialData.id}`;

  const onPublish = () => {
    const promise = update({
      id: initialData.id,
      isPublished: true,
    });
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published!",
      error: "Failed to publish note.",
    });
  };

  const onUnpublish = () => {
    const promise = update({
      id: initialData.id,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="ml-2 h-4 w-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-sky-500" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p>Published this note</p>
            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
