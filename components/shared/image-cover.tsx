"use client";

import { useServerAction } from "zsa-react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { removeCoverImage as _removeCoverImage } from "@/actions";
import { useEdgeStore } from "@/lib/edgestore";
import { Document } from "@prisma/client";
import { useCoverImage, useRevalidate } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { Skeleton, Button } from "../ui";

interface CoverImageProps {
  url?: string | null;
  preview?: boolean;
}

export const ImageCover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const params = useParams();

  const { revalidate } = useRevalidate();
  const coverImage = useCoverImage();
  const { execute: removeCoverImage } = useServerAction(_removeCoverImage, {
    onSuccess: ({ data }) => revalidate(data.id),
  });

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      documentId: params.documentId as Document["id"],
    });
  };

  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image src={url} fill alt="cover" className="object-cover" priority />
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

ImageCover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
